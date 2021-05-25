import React from "react";
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Autocomplete from '@material-ui/lab/Autocomplete';

import FormHelperText from '@material-ui/core/FormHelperText';


export const RenderTextField = ({
    input,
    label,
    meta: { touched, error },
    setFieldToBeFocused = () => { },
    ...custom
}) => {
    return (
        <TextField
            input={input}
            label={label}
            error={Boolean(touched && error)}
            helperText={touched && error}
            {...input}
            {...custom}
            ref={input => setFieldToBeFocused(input)}
        />
    )
};


export const RenderSelectField = ({
    input,
    label,
    meta: { touched, error },
    children,
    fullWidth,
    variant,
    margin,
    ...custom
}) => {
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    return (
        <FormControl margin={margin} variant={variant} fullWidth={fullWidth} error={touched && error} >
            <InputLabel ref={inputLabel}>{label}</InputLabel>
            <Select
                onChange={(event, index, value) => input.onChange(value)}
                children={children}
                labelWidth={labelWidth}
                {...input}
                {...custom}
            >
            </Select>
            {RenderFromHelper({ touched, error })}
        </FormControl>
    )
}

export const RenderFromHelper = ({ touched, error }) => {
    if (!(touched && error)) {
        return
    } else {
        return <FormHelperText>{touched && error}</FormHelperText>
    }
};


export const RenderAutocompleteField = ({
    input,
    label,
    meta: { touched, error },
    options,
    variant,
    margin,
    ...custom
}) => {
    var select_list = {};
    if (input.value === "") {
        select_list = {}
    }
    else if (typeof input.value === "string") {
        select_list = options.filter(i => i.value === input.value)
        if (select_list.length > 0) {
            select_list = select_list[0]
        }
    }
    return (
        <Autocomplete
            options={options}
            getOptionLabel={option => option.label}
            style={{ width: "100%" }}
            renderInput={params => (
                <TextField
                    {...params}
                    label={label}
                    variant={variant}
                    margin={margin}
                    fullWidth
                    error={Boolean(touched && error)}
                    helperText={touched && error}
                    {...input}
                    onBlur={() => { }}
                />
            )}
            value={select_list}
            onChange={(event, value) => input.onChange(value)}
            {...custom}
        >
        </Autocomplete >
    )
};
