import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        // the translations
        // (tip move them in a JSON file and import them,
        // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
        resources: {
            en: {
                translation: {
                    "Welcome to React": "Welcome to React and react-i18next",
                    welcome: "Welcome",
                    goodbye: "Goodbye",
                    
                    AppDetails:"Applicant Details",

                    Surname: "Surname (exactly as in your Passport)",
                    SurnameErrorEmpty:"The 'Last Name' field is required.",
                    SurnameError:"In the 'Last name' field, only the Latin alphabet is allowed, the first letter is capitalized.",
                    
                    Name:"Given Name/s (exactly as in your Passport)",
                    NameErrorEmpty:"The 'Name' field is required.",
                    NameError:"In the 'Name' field, only Cyrillic is allowed, the first letter is capitalized.",

                    Surname_info:"Have you ever changed your name? If yes, give details.",
                    Surname_infoError:"Required field.",

                    Gender:"Gender",
                    Male:"Male",
                    Female:"Female",

                    DateOfBirth:"Date of Birth",
                    DateOfBirthErrorEmpty:"The 'Date of Birth' field is required.",
                    DateOfBirthError:"The 'Date of Birth' field must follow the format 'dd.mm.yyyy'.",

                    Nationality:"Nationality",
                    NationalityError:"The 'Nationality' field is required.",

                    Town:"Town, City of birth",
                    TownError:"Required field.",

                    Country:"Country/Region of birth",
                    Сou0:"Republic of Belarus",
                    Сou1:"Russian Federation",
                    Сou2:"Republic of Kazakhstan",
                    Сou3:"Republic of Tajikistan",
                    Сou4:"Republic of Kyrgyzstan",

                    Number:"Citizenship/National Id No.",

                    Religion:"Religion",

                    PhoneNumber:"Phone number",
                    PhoneNumberErrorEmpty:"Field 'Phone number' required to be filled out.",
                    PhoneNumberError:"The 'Phone number' field must follow the format '+375XXXXXXXXXX'.",

                    Email:"Email ID",
                    EmailErrorEmpty:"The 'Email ID' field is required.",
                    EmailError:"The 'Email ID' field is filled in incorrectly.",

                    DataYourPeople:"Do you have relatives in the Republic of Belarus? If yes, give details.",
                    DataYourPeopleErrorEmpty:"Required field.",

                    NameSurname:"Name and surname of your representative.",
                    PhoneRepresantative:"Phone number of your represantative",
                    PhoneRepresantativeError:"The field must follow the format '+375XXXXXXXXXX'.",
                    
                    Passport:"Passport Details",

                    PassNumber:"Passport Number",
                    PassNumberErrorEmpty:"Required field.",

                    CountryPass:"County of Issue",

                    PlaceOfIssue:"Place of Issue",
                    PlaceOfIssueErrorEmpty:"Required field.",

                    DataOfIssue:"Date of Issue",
                    DataOfIssueErrorEmpty:"The 'Date of Issue' field is required.",
                    DataOfIssueError:"The 'Date of Issue' field must follow the format 'dd.mm.yyyy'.",

                    DateOfExiry:"Date of Expiry",
                    DateOfEcpiryErrorEmpty:"The 'Date of Expiry' field is required.",
                    DateOfEcpiryError:"The 'Date of Expiry' field must follow the format 'dd.mm.yyyy'.",

                    NatPassw:"Nationality mentioned therein",
                    
                    EducationInfo:"Education, information about the education document",

                    EducationInst:"Name of the educational institution(school, college)",

                    EduSerialNumber:"The series and number of the education document",

                    InfoAdmission:"Information about admission",

                    Faculty:"The faculty where the training is planned",


                }
            },
            ru: {
                translation: {
                    welcome: "Добро пожаловать",
                    goodbye: "До свидания",
                    
                    AppDetails:"Данные абитуриента",

                    Surname: "Фамилия (точно так, как в паспорте)",
                    SurnameErrorEmpty:"Поле 'Фамилия' обязательно для заполнения.",
                    SurnameError:"В поле 'Фамилия' допустима только латиница, первая буква - заглавная.",
                    
                    Name:"Фамилия (точно так, как в паспорте)",
                    NameErrorEmpty:"Поле 'Имя' обязательно для заполнения.",
                    NameError:"In the 'Name' field, only the Latin alphabet is allowed, the first letter is capitalized.",

                    Surname_info:"Изменяли ли Вы своё имя, фамилию? Если да, то предоставьте информацию: когда и в связи с чем.",
                    Surname_infoError:"Поле обязательно для заполнения.",

                    Gender:"Пол",
                    Male:"Мужской",
                    Female:"Женский",

                    DateOfBirth:"Дата рождения",
                    DateOfBirthErrorEmpty:"Поле 'Дата рождения' обязательно для заполнения.",
                    DateOfBirthError:"Поле 'Дата рождения' должно соответствовать формату 'дд.мм.гггг'.",

                    Nationality:"Гражданство/национальность",
                    NationalityError:"Поле 'Гражданство' обязательно для заполнения.",

                    Town:"Город, в котором родились",
                    TownError:"Поле обязательно для заполнения.",

                    Country:"Страна, в которой родились",
                    Сou0:"Республика Беларусь",
                    Сou1:"Российская Федерация",
                    Сou2:"Республика Казахстан",
                    Сou3:"Республика Таджикистан",
                    Сou4:"Кыргызская Республика",

                    Number:"Гражданский/национальный номер",
                    Religion:"Религия",

                    PhoneNumber:"Номер телефона",
                    PhoneNumberErrorEmpty:"Поле 'Номер телефона' обязательно для заполнения.",
                    PhoneNumberError:"Поле 'Номер телефона' должно соответствовать формату '+375XXXXXXXXX'.",
                    
                    Email:"Электронная почта",
                    EmailErrorEmpty:"Поле 'Электронная почта' обязательно для заполнения.",
                    EmailError:"Поле 'Электронная почта' заполнено неверно.",

                    DataYourPeople:"Имеются ли у Вас родственники в Республике Беларусь Если да, то напишите фамилию, имя, отчество, номер телефона для каждого.",
                    DataYourPeopleErrorEmpty:"Поле обязательно для заполнения.",

                    NameSurname:"Имя и фамилия Вашего представителя в Республике Беларусь.",
                    PhoneRepresantative:"Номер телефона Вашего представителя в Республике Беларусь",
                    PhoneRepresantativeError:"Поле должно соответствовать формату '+375XXXXXXXXX'.",

                    Passport:"Паспортные данные",

                    PassNumber:"Серия(при наличии), номер паспорта",
                    PassNumberErrorEmpty:"Поле обязательно для заполнения.",


                    CountryPass:"Страна выдачи паспорта",
                    PlaceOfIssue:"Орган, выдавший паспорт",
                    PlaceOfIssueErrorEmpty:"Поле обязательно для заполнения.",

                    DataOfIssue:"Дата выдачи паспорта",
                    DataOfIssueErrorEmpty:"Поле 'Дата выдачи' обязательно для заполнения.",
                    DataOfIssueError:"Поле 'Дата выдачи' должно соответствовать формату 'дд.мм.гггг'.",

                    DateOfEcpiry:"Срок действия",
                    DateOfEcpiryErrorEmpty:"Поле 'Срок действия' обязательно для заполнения.",
                    DateOfEcpiryError:"Поле 'Срок действия' должно соответствовать формату 'дд.мм.гггг'.",

                    NatPassw:"Национальность, указанная в паспорте",
                    
                    EducationInfo:"Образование, информация про документ об образовании",

                    EducationInst:"Название учебного заведения, которое Вы окончили(школа, колледж и т.п.)",

                    EduSerialNumber:"Серия и номер документа об образовании",

                    InfoAdmission:"Информация о поступлении",

                    Faculty:"Факультет, на котором планируете проходить обучение, или подготовительные курсы",

                }
            }
        },
        lng: "en", // if you're using a language detector, do not define the lng option
        fallbackLng: "en",

        interpolation: {
            escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
        }
    });