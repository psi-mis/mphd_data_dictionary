
import * as TranslationService from "../services/Translation.service";

export const getDataTableHeaders = () => {
    return [
        {
            id: "code",
            valueType: "TEXT",
            label: TranslationService.translate("common_terms_code", "Code")
        },
        {
            id: "shortName",
            valueType: "TEXT",
            label: TranslationService.translate("common_terms_shortName", "Short name")
        },
        {
            id: "name",
            valueType: "TEXT",
            label: TranslationService.translate("common_terms_name", "Name")
        },
        {
            id: "description",
            valueType: "TEXT",
            label: TranslationService.translate("common_terms_description", "Description")
        },
        {
            id: "catCombo",
            valueType: "TEXT",
            label: TranslationService.translate("common_terms_desegregation", "Desegregation")
        },
        {
            id: "dataSets",
            valueType: "TEXT",
            label: TranslationService.translate("common_terms_dataSets", "Data sets")
        },
        {
            id: "periodType",
            valueType: "TEXT",
            label: TranslationService.translate("common_terms_frequency", "Frequency")
        }
    ]
}