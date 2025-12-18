import type { WidgetProps } from "@rjsf/utils";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import NumberField from "./NumberField";
dayjs.extend(customParseFormat);

export const NumberAsStringField = (props: WidgetProps) => {
    const { label, value, onChange, disabled, readonly, rawErrors, itemID } = props;

    const handleChange = (newValue: number | null) => {
        onChange(newValue !== null ? String(newValue) : undefined);
    }

    return (<NumberField
        id={itemID}
        label={label}
        value={Number.isNaN(Number(value)) ? null : Number(value)}
        onValueChange={(value) => handleChange(value)}
        disabled={disabled || readonly}
        error={rawErrors && rawErrors.length > 0}
    />
    );
}
