import colors from '../util/colors';

export const selectStyles = {
    container: base => ({
        ...base,
        fontWeight: '200',
        color: colors.darkPrimary,
        width: '100%',
    }),
    control: base => ({
        ...base,
        backgroundColor: colors.darkPrimary,
        width: '100%',
        border: 'none',
        boxShadow: 'none',
        cursor: 'text',
        transition: 'none',
    }),
    clearIndicator: base => ({
        ...base,
        color: colors.offWhite,
        cursor: 'pointer',
        '&:hover': {
            color: colors.primary,
        },
    }),
    singleValue: base => ({
        ...base,
        color: colors.white,
    }),
    placeholder: base => ({
        ...base,
        color: colors.offWhite,
    }),
    input: base => ({
        ...base,
        color: colors.white,
    }),
    menu: base => ({
        ...base,
        backgroundColor: colors.primary,
        borderRadius: 0,
        border: `1px solid ${colors.offWhite}`,
    }),
    option: (base, state) => ({
        ...base,
        '&:hover': {
            color: colors.white,
            background: `linear-gradient(to top right, ${colors.turqoise}, ${colors.lightGreen})`,
        },
        color: state.isSelected ? colors.white : colors.offWhite,
        backgroundColor: state.isSelected ? colors.secondary : colors.primary,
        cursor: 'pointer',
    }),
    indicatorSeparator: base => ({
        ...base,
        backgroundColor: 'none',
    }),
    dropdownIndicator: base => ({
        ...base,
        cursor: 'pointer',
        color: colors.offWhite,
        '&:hover': {
            color: colors.lightGreen,
        },
    }),
};
