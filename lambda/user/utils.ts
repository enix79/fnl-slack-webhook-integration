interface Field {
    id: string;
    label: string;
    type: FieldType;
    value: string | string[];
}

type FieldType =
    | 'MultipleChoice'
    | 'EmailInput'
    | 'PhoneNumber'
    | 'ShortAnswer'
    | 'Checkboxes'
    | 'Datepicker';
type FieldMapping = { [fieldName: string]: Field | undefined };
type PersonalDataFields =
    | 'salutation'
    | 'title'
    | 'firstName'
    | 'lastName'
    | 'mobileNumber'
    | 'email'
    | 'maritalStatus'
    | 'birthName'
    | 'birthDate'
    | 'birthPlace'
    | 'birthCountry';
type PersonalDataFieldMapping = {
    [fieldName in PersonalDataFields]: Field | undefined;
};
type LivingSituationFields =
    | 'street'
    | 'houseNumber'
    | 'zipCode'
    | 'city'
    | 'livingSince'
    | 'livingType'
    | 'carsInHousehold'
    | 'personsInHousehold'
    | 'nationality'
    | 'taxId';
type LivingSituationFieldMapping = {
    [fieldName in LivingSituationFields]: Field | undefined;
};

const formatDate = (date: string) => date.split('-').reverse().join('.');

const getPersonalData: (fields: Field[]) => PersonalDataFieldMapping = (
    fields
) => ({
    salutation: fields.find((field) => field.label === 'Anrede'),
    title: fields.find((field) => field.label === 'Titel'),
    firstName: fields.find((field) => field.label === 'Vorname'),
    lastName: fields.find((field) => field.label === 'Nachname'),
    mobileNumber: fields.find((field) => field.label === 'Handynummer'),
    email: fields.find((field) => field.label === 'E-Mail'),
    maritalStatus: fields.find((field) => field.label === 'Familienstand'),
    birthName: fields.find((field) => field.label === 'Geburtsname'),
    birthDate: fields.find((field) => field.label === 'Geburtsdatum'),
    birthPlace: fields.find((field) => field.label === 'Geburtsort'),
    birthCountry: fields.find((field) => field.label === 'Geburtsland'),
});

const getLivingSituationData: (
    fields: Field[]
) => LivingSituationFieldMapping = (fields) => ({
    street: fields.find((field) => field.label === 'Straße'),
    houseNumber: fields.find((field) => field.label === 'Hausnummer'),
    zipCode: fields.find((field) => field.label === 'PLZ'),
    city: fields.find((field) => field.label === 'Stadt'),
    livingSince: fields.find((field) => field.label === 'Wohnhaft seit'),
    livingType: fields.find((field) => field.label === 'Wohnart'),
    carsInHousehold: fields.find(
        (field) => field.label === 'Autos im Haushalt'
    ),
    personsInHousehold: fields.find(
        (field) => field.label === 'Personen im Haushalt'
    ),
    nationality: fields.find((field) => field.label === 'Staatsangehörigkeit'),
    taxId: fields.find((field) => field.label === 'Steuer-ID'),
});

type HeaderBlock = {
    type: 'header';
    text: { type: 'plain_text'; text: string };
};
type DividerBlock = { type: 'divider' };
type SectionBlock = {
    type: 'section';
    fields: Array<{ type: string; text: string } | undefined>;
};
type Block = HeaderBlock | DividerBlock | SectionBlock;

const personalDataToBlockKit: (data: PersonalDataFieldMapping) => Block[] = (
    data
) => [
    {
        type: 'header',
        text: {
            type: 'plain_text',
            text: 'Persönliche Daten',
        },
    },
    {
        type: 'divider',
    },
    {
        type: 'section',
        fields: [
            data.salutation && {
                type: 'mrkdwn',
                text: `*${data.salutation.label}*:\n ${data.salutation.value}`,
            },
            data.title && {
                type: 'mrkdwn',
                text: `*${data.title.label}*:\n ${(
                    data.title.value as string[]
                ).join(' ')}`,
            },
            data.firstName && {
                type: 'mrkdwn',
                text: `*${data.firstName.label}*:\n ${data.firstName.value}`,
            },
            data.lastName && {
                type: 'mrkdwn',
                text: `*${data.lastName.label}*:\n ${data.lastName.value}`,
            },
            data.birthName && {
                type: 'mrkdwn',
                text: `*${data.birthName.label}*:\n ${data.birthName.value}`,
            },
        ].filter((field) => !!field),
    },
    {
        type: 'section',
        fields: [
            data.mobileNumber && {
                type: 'mrkdwn',
                text: `*${data.mobileNumber.label}*:\n ${data.mobileNumber.value}`,
            },
            data.email && {
                type: 'mrkdwn',
                text: `*${data.email.label}*:\n ${data.email.value}`,
            },
        ].filter((field) => !!field),
    },
    {
        type: 'section',
        fields: [
            data.maritalStatus && {
                type: 'mrkdwn',
                text: `*${data.maritalStatus.label}*:\n ${data.maritalStatus.value}`,
            },
        ].filter((field) => !!field),
    },
    {
        type: 'section',
        fields: [
            data.birthDate && {
                type: 'mrkdwn',
                text: `*${data.birthDate.label}*:\n ${formatDate(
                    data.birthDate.value as string
                )}`,
            },
            data.birthPlace && {
                type: 'mrkdwn',
                text: `*${data.birthPlace.label}*:\n ${data.birthPlace.value}`,
            },
            data.birthCountry && {
                type: 'mrkdwn',
                text: `*${data.birthCountry.label}*:\n ${data.birthCountry.value}`,
            },
        ].filter((field) => !!field),
    },
];
// ].filter((block) =>
//     block.type === 'section' ? block.fields.length > 0 : true
// );

//

const livingSituationToBlockKit = (data: LivingSituationFieldMapping) =>
    [
        {
            type: 'header',
            text: {
                type: 'plain_text',
                text: 'Wohnsituation',
            },
        },
        {
            type: 'divider',
        },
        {
            type: 'section',
            fields: [
                data.street && {
                    type: 'mrkdwn',
                    text: `*${data.street.label}*:\n ${data.street.value}`,
                },
                data.houseNumber && {
                    type: 'mrkdwn',
                    text: `*${data.houseNumber.label}*:\n ${data.houseNumber.value}`,
                },
                data.zipCode && {
                    type: 'mrkdwn',
                    text: `*${data.zipCode.label}*:\n ${data.zipCode.value}`,
                },
                data.city && {
                    type: 'mrkdwn',
                    text: `*${data.city.label}*:\n ${data.city.value}`,
                },
                data.livingSince && {
                    type: 'mrkdwn',
                    text: `*${data.livingSince.label}*:\n ${formatDate(
                        data.livingSince.value as string
                    )}`,
                },
                data.livingType && {
                    type: 'mrkdwn',
                    text: `*${data.livingType.label}*:\n ${data.livingType.value}`,
                },
            ].filter((field) => !!field),
        },
        {
            type: 'section',
            fields: [
                data.carsInHousehold && {
                    type: 'mrkdwn',
                    text: `*${data.carsInHousehold.label}*:\n ${data.carsInHousehold.value}`,
                },
                data.personsInHousehold && {
                    type: 'mrkdwn',
                    text: `*${data.personsInHousehold.label}*:\n ${data.personsInHousehold.value}`,
                },
            ].filter((field) => !!field),
        },
        {
            type: 'section',
            fields: [
                data.nationality && {
                    type: 'mrkdwn',
                    text: `*${data.nationality.label}*:\n ${data.nationality.value}`,
                },
                data.taxId && {
                    type: 'mrkdwn',
                    text: `*${data.taxId.label}*:\n ${data.taxId.value}`,
                },
            ].filter((field) => !!field),
        },
    ].filter((block) =>
        block.type === 'section' ? block.fields.length > 0 : true
    );

exports.formatDate = formatDate;
exports.getPersonalData = getPersonalData;
exports.personalDataToBlockKit = personalDataToBlockKit;
exports.getLivingSituationData = getLivingSituationData;
