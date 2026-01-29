import React, { useState, useEffect, useRef } from "react";
import UploadBox from "../components/UploadBox";
import DocumentoPromesa from "../components/DocumentoPromesa";
import { useParams } from "react-router-dom";

interface FileUpload {
    file: File | null;
    preview: string | null;
}

const PromesaFirma: React.FC = () => {
    const { id } = useParams();
    const [urlId, setUrlId] = useState<string | null>(null);
    const [nameclient] = useState<string>("");
    const [copied, setCopied] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);
    const modalDocRootRef = useRef<HTMLDivElement | null>(null);

    const getDocElement = (root: ParentNode | null) => {
        return (
            (root?.querySelector(".documento-promesa") as HTMLElement) || null
        );
    };

    const scrollToInRoot = (root: ParentNode | null, elementId: string) => {
        const css = (
            window as unknown as { CSS?: { escape: (s: string) => string } }
        ).CSS;
        const escapedId = css?.escape ? css.escape(elementId) : elementId;
        const target = root?.querySelector(`#${escapedId}`);
        (target as HTMLElement | null)?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    const ordinalMap: Record<number, string> = {
        1: "primera",
        2: "segunda",
        3: "tercera",
        4: "cuarta",
        5: "quinta",
        6: "sexta",
        7: "septima",
        8: "octava",
        9: "novena",
        10: "decima",
        11: "decima-primera",
        12: "decima-segunda",
    };

    const handleCopyText = (root?: ParentNode | null) => {
        const docElement = getDocElement(root ?? modalDocRootRef.current);
        if (docElement) {
            const text = docElement.innerText;
            navigator.clipboard.writeText(text).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            });
        }
    };

    const handleDownloadPDF = async (root?: ParentNode | null) => {
        setIsExporting(true);
        const element = getDocElement(root ?? modalDocRootRef.current);
        if (element) {
            try {
                const jsPDF = (await import("jspdf")).default;

                const pdf = new jsPDF({
                    orientation: "portrait",
                    unit: "mm",
                    format: "a4",
                });

                // Extraer el texto del documento
                const text = element.innerText;

                // Configuración de página
                const pageWidth = 210; // A4 width in mm
                const pageHeight = 297; // A4 height in mm
                const margin = 20;
                const maxWidth = pageWidth - margin * 2;
                let yPos = margin;

                // Configurar fuente
                pdf.setFontSize(10);
                pdf.setTextColor(0, 0, 0);

                // Dividir el texto en líneas que quepan en el ancho de la página
                const lines = pdf.splitTextToSize(text, maxWidth);

                // Agregar líneas al PDF, creando nuevas páginas cuando sea necesario
                lines.forEach((line: string) => {
                    if (yPos > pageHeight - margin) {
                        pdf.addPage();
                        yPos = margin;
                    }
                    pdf.text(line, margin, yPos);
                    yPos += 6; // Espaciado entre líneas
                });

                // Guardar el PDF
                pdf.save(`Promesa_${nameclient || "Documento"}.pdf`);
                setIsExporting(false);
            } catch (error) {
                console.error("Error al exportar PDF:", error);
                setIsExporting(false);
            }
        } else {
            setIsExporting(false);
        }
    };

    useEffect(() => {
        setUrlId(id || null);
    }, [id]);

    const [files, setFiles] = useState<Record<string, FileUpload>>({
        promesa_firmada: { file: null, preview: null },
    });

    const [dragOver, setDragOver] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFileChange = (type: string, file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setFiles((prev) => ({
                ...prev,
                [type]: { file, preview: reader.result as string },
            }));
        };
        reader.readAsDataURL(file);
    };

    const handleDrop = (e: React.DragEvent, type: string) => {
        e.preventDefault();
        setDragOver(null);
        const file = e.dataTransfer.files[0];
        if (file && isValidFile(file)) {
            handleFileChange(type, file);
        }
    };

    const handleDragOver = (e: React.DragEvent, type: string) => {
        e.preventDefault();
        setDragOver(type);
    };

    const handleDragLeave = () => {
        setDragOver(null);
    };

    const isValidFile = (file: File) => {
        const validDocTypes = ["application/pdf"];
        return validDocTypes.includes(file.type);
    };

    const removeFile = (type: string) => {
        setFiles((prev) => ({
            ...prev,
            [type]: { file: null, preview: null },
        }));
    };

    const handleSubmit = async () => {
        if (!urlId) {
            alert(
                "No se pudo obtener el ID de la URL. Por favor, asegúrate de acceder al formulario desde el enlace correcto.",
            );
            return;
        }

        if (files.promesa_firmada.file) {
            setIsSubmitting(true);
            try {
                const formData = new FormData();
                formData.append("promesa_firmada", files.promesa_firmada.file);

                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/promesafirmada`,
                    {
                        method: "POST",
                        body: formData,
                    },
                );

                const responseData = await response.json().catch(() => ({}));

                if (!response.ok) {
                    throw new Error(
                        responseData.message || "Error en el servidor",
                    );
                }

                console.log("Respuesta del servidor:", responseData);
                alert(
                    "Documento enviado correctamente. Por favor revise su correo electrónico, ya que se le notificará una vez el documento haya sido procesado.",
                );
                setFiles({ promesa_firmada: { file: null, preview: null } });
            } catch (error) {
                console.error("Error al enviar documento:", error);
                const errorMessage =
                    error instanceof Error
                        ? error.message
                        : "Ocurrió un error desconocido";
                alert(`Error al enviar el documento: ${errorMessage}`);
            } finally {
                setIsSubmitting(false);
            }
        } else {
            alert("Por favor, sube el documento requerido");
        }
    };

    const allFilesUploaded = files.promesa_firmada.file;
    const uploadedCount = files.promesa_firmada.file ? 1 : 0;

    return (
        <div className="min-h-screen lg:h-screen bg-white flex flex-col overflow-x-hidden lg:overflow-hidden">
            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #d1d1d6;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #a1a1a6;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fadeIn 0.8s ease-out forwards;
                }
            `}</style>

            {/* Header con Logo */}
            <div className="w-full bg-white border-b border-gray-200 py-4 flex justify-center items-center z-10 shadow-sm shrink-0">
                <img
                    src="/logo.png"
                    alt="Logo"
                    className="w-44 object-contain"
                />
            </div>

            {/* Contenedor de Secciones */}
            <div className="flex-1 overflow-y-auto">
                {/* Sección Derecha - Formulario */}
                <div className="w-full bg-white flex flex-col justify-center min-h-[80vh] p-6 sm:p-8 lg:p-16">
                    <div className="max-w-xl w-full mx-auto animate-fade-in">
                        {/* Main Card */}
                        <div className="card bg-base-200 shadow-2xl">
                            <div className="card-body">
                                <h2 className="card-title md:text-2xl text-xl mb-2 text-white font-bold">
                                    Promesa Firmada {nameclient}
                                </h2>
                                <p className="text-base-content/70 mb-6 font-medium">
                                    Por favor, sube la promesa firmada para
                                    completar el proceso:
                                </p>

                                <div className="space-y-6">
                                    <UploadBox
                                        type="promesa_firmada"
                                        title="Promesa Firmada"
                                        subtitle="Sube un PDF de la promesa firmada"
                                        belowSubtitleLinkText="Ver Documento"
                                        belowSubtitleLinkOnClick={() =>
                                            setIsDocumentModalOpen(true)
                                        }
                                        acceptedFormats="application/pdf"
                                        fileData={files.promesa_firmada}
                                        dragOver={dragOver}
                                        onFileChange={handleFileChange}
                                        onRemoveFile={removeFile}
                                        onDrop={handleDrop}
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                    />
                                </div>

                                {/* Progress */}
                                <div className="mt-8 mb-6">
                                    <div className="flex items-center justify-between text-sm mb-2">
                                        <span className="font-medium text-gray-700">
                                            Progreso de carga
                                        </span>
                                        <span className="badge badge-outline">
                                            {uploadedCount} de 1
                                        </span>
                                    </div>
                                    <progress
                                        className="progress w-full h-2"
                                        value={uploadedCount}
                                        max="1"
                                    ></progress>
                                </div>

                                {/* Submit Button */}
                                <div className="card-actions justify-end mt-4">
                                    <button
                                        onClick={handleSubmit}
                                        disabled={
                                            !allFilesUploaded || isSubmitting
                                        }
                                        className={`btn btn-block ${
                                            allFilesUploaded && !isSubmitting
                                                ? "btn bg-orange-100 text-black hover:bg-orange-200 border-none shadow-md"
                                                : "btn-disabled bg-gray-200 text-gray-400"
                                        }`}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <span className="loading loading-spinner loading-xs mr-2"></span>
                                                Enviando documentos...
                                            </>
                                        ) : allFilesUploaded ? (
                                            "Enviar Documento"
                                        ) : (
                                            "Completa el campo requerido"
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="text-center mt-8">
                            <a
                                className="text-sm text-black/50 hover:text-black transition-colors"
                                href="https://redtec.ai/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                &copy; 2024 Redtec. Todos los derechos
                                reservados.
                            </a>
                        </div>
                    </div>
                </div>

                {/* Modal para Ver Documento */}
                {isDocumentModalOpen && (
                    <div className="modal modal-open" role="dialog">
                        <div className="modal-box max-w-6xl w-[96vw] p-0 bg-[#f5f5f7]">
                            <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
                                <h3 className="font-semibold text-gray-800">
                                    Documento
                                </h3>
                                <button
                                    type="button"
                                    className="btn btn-primary btn-sm"
                                    onClick={() =>
                                        setIsDocumentModalOpen(false)
                                    }
                                >
                                    Cerrar
                                </button>
                            </div>
                            <div className="relative h-[90vh] bg-[#f5f5f7]">
                                <div className="hidden lg:flex absolute left-3 top-1/2 -translate-y-1/2 z-20 flex-col items-center gap-1 p-2 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200">
                                    <button
                                        onClick={() =>
                                            scrollToInRoot(
                                                modalDocRootRef.current,
                                                "inicio",
                                            )
                                        }
                                        className="p-3 hover:bg-blue-50 rounded-xl transition-colors tooltip tooltip-right"
                                        data-tip="Inicio"
                                    >
                                        <svg
                                            className="w-5 h-5 text-[#0033cc]"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M5 11l7-7 7 7M5 19l7-7 7 7"
                                            />
                                        </svg>
                                    </button>

                                    <div className="w-8 h-px bg-gray-100 my-1"></div>

                                    {[
                                        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
                                    ].map((num) => (
                                        <button
                                            key={num}
                                            onClick={() => {
                                                scrollToInRoot(
                                                    modalDocRootRef.current,
                                                    `clausula-${ordinalMap[num]}`,
                                                );
                                            }}
                                            className="w-9 h-9 flex items-center justify-center hover:bg-blue-50 rounded-xl transition-colors text-[10px] font-bold text-gray-500 hover:text-[#0033cc] tooltip tooltip-right"
                                            data-tip={`Cláusula ${num}`}
                                        >
                                            C{num}
                                        </button>
                                    ))}

                                    <div className="w-8 h-px bg-gray-100 my-1"></div>

                                    <button
                                        onClick={() =>
                                            scrollToInRoot(
                                                modalDocRootRef.current,
                                                "firmas",
                                            )
                                        }
                                        className="p-3 hover:bg-blue-50 rounded-xl transition-colors tooltip tooltip-right"
                                        data-tip="Final / Firmas"
                                    >
                                        <svg
                                            className="w-5 h-5 text-[#0033cc]"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
                                            />
                                        </svg>
                                    </button>
                                </div>

                                <div className="absolute right-3 top-3 lg:top-1/2 lg:-translate-y-1/2 z-30 flex flex-col items-center gap-3">
                                    <button
                                        onClick={() =>
                                            handleCopyText(
                                                modalDocRootRef.current,
                                            )
                                        }
                                        className={`p-3.5 rounded-2xl shadow-lg border transition-all duration-300 tooltip tooltip-left hover:scale-110 active:scale-95 ${copied ? "bg-green-500 text-white border-green-600" : "bg-white text-gray-700 border-gray-200 hover:border-blue-400 hover:text-blue-600"}`}
                                        data-tip={
                                            copied
                                                ? "¡Copiado!"
                                                : "Copiar todo el texto"
                                        }
                                    >
                                        {copied ? (
                                            <svg
                                                className="w-6 h-6 animate-bounce"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2.5"
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                        ) : (
                                            <svg
                                                className="w-6 h-6"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                                                />
                                            </svg>
                                        )}
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleDownloadPDF(
                                                modalDocRootRef.current,
                                            )
                                        }
                                        disabled={isExporting}
                                        className={`p-3.5 rounded-2xl shadow-lg border transition-all duration-300 tooltip tooltip-left hover:scale-110 active:scale-95 ${isExporting ? "bg-blue-100 cursor-not-allowed border-blue-200" : "bg-[#0033cc] text-white border-blue-700 hover:bg-blue-700 shadow-blue-200"}`}
                                        data-tip={
                                            isExporting
                                                ? "Generando..."
                                                : "Descargar como PDF"
                                        }
                                    >
                                        {isExporting ? (
                                            <span className="loading loading-spinner loading-md"></span>
                                        ) : (
                                            <svg
                                                className="w-6 h-6"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                                />
                                            </svg>
                                        )}
                                    </button>
                                </div>

                                <div className="h-full overflow-auto flex justify-center items-start py-6 px-2 sm:px-4">
                                    <div
                                        ref={modalDocRootRef}
                                        className="transform scale-[0.7] sm:scale-[0.85] lg:scale-[0.95] origin-top"
                                    >
                                        <DocumentoPromesa />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="modal-backdrop"
                            onClick={() => setIsDocumentModalOpen(false)}
                        ></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PromesaFirma;
