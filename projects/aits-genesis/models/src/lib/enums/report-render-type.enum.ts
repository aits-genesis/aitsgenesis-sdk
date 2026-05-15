import { FileRenderFormatEnum } from './file-render-format.enum';

export enum ReportRenderTypeEnum {
  Pdf = FileRenderFormatEnum.Pdf,
  Excel = FileRenderFormatEnum.MsExcel,
  Csv = FileRenderFormatEnum.Csv,
  Word = FileRenderFormatEnum.MsWord,
}
