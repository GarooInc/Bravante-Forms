declare module "html-to-docx" {
    interface DocumentOptions {
        table?: { row?: { cantSplit?: boolean } };
        footer?: boolean;
        pageNumber?: boolean;
        font?: string;
        fontSize?: number;
        margins?: {
            top?: number;
            right?: number;
            bottom?: number;
            left?: number;
        };
    }

    function HTMLtoDOCX(
        htmlString: string,
        headerHTMLString?: string,
        documentOptions?: DocumentOptions,
        footerHTMLString?: string,
    ): Promise<Blob | Buffer>;

    export default HTMLtoDOCX;
}
