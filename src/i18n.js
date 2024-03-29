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

                    DataOfIssueEdu:"Date of Issue",
                    DataOfIssueEduErrorEmpty:"The 'Date of Issue' field is required.",
                    DataOfIssueEduError:"The 'Date of Issue' field must follow the format 'dd.mm.yyyy'.",

                    DateOfExiry:"Date of Expiry",
                    DateOfExiryErrorEmpty:"The 'Date of Expiry' field is required.",
                    DateOfExiryError:"The 'Date of Expiry' field must follow the format 'dd.mm.yyyy'.",

                    NatPassw:"Nationality mentioned therein",
                    
                    EducationInfo:"Education, information about the education document",

                    EducationInst:"Name of the educational institution(school, college)",

                    EduSerialNumber:"The series and number of the education document",

                    InfoAdmission:"Information about admission",

                    Faculty:"The faculty where the training is planned",
                    
                    FacName1:"Faculties",
                    Fac1:"Medicinal",
                    Fac2:"Pediatric",
                    Fac3:"Medical and preventive",
                    Fac4:"Dental",
                    Fac6:"Pharmaceutical",
                    Fac20:"Pharmaceutical (part-time)",
                    Fac7:"Career guidance and pre-university preparation",
                    
                    FacName2:"Faculty of medicine for foreign students",
                    Fac10:"Therapeutic, russian language of instruction",
                    Fac11:"Therapeutic, english language of instruction",
                    Fac12:"Dental, russian language of instruction",
                    Fac13:"Dental, english language of instruction",
                    Fac14:"Medical and preventive, russian language of instruction",
                    Fac15:"Pharmaceutical, russian language of instruction",
                    Fac16:"Pharmaceutical, english language of instruction",
                    Fac21:"Pharmaceutical, russian language of instruction (correspondence)",
                    
                    FacName3:"Military medical Institute",
                    Fac8:"Armed forces",
                    Fac19:"Armed forces (female)",
                    Fac17:"Internal troops",
                    Fac5:"State border committee",
                    Fac9:"Ministry of internal affairs",
                    Fac18:"Ministry of emergency situations",

                    HostelLive:"Are you planning to live in a hostel or an apartment?",

                    AddDoc:"Attach documents",

                    AddFile1:"1) Applicant's passport and its copy translated into russian and notarized (a page with a photo and a passport number);",
                    AddFile2:"2) The original certificate (document) of complete secondary education (advanced level) indicating the subjects studied adn the grades (points) obtained on them, and its copy translated into russian and notarized;",
                    AddFile3:"3) Certificate of the absence of HIV infection, issued by the official health authority of the country from which the applicant arrived and its copy, translated into russian and notarized;",
                    AddFile4:"4) For underage (under 18 years old) applicants: the original birth certificate and its copy translated into russian and notarized or the original of another document confirming the date of birth and citizenship, and its copy translated into russian and notarized;",
                    AddFile5:"5) For underage (under 18 years old) applicants: a power of attorney to represent the interests of a minor and its copy translated into russian and notarized - in case of submission of documents without the presens of parents/guardians;",
                    AddFile6:"6) A document on passing a mandatory medical examination, confirming the absence of medical contraindications to study in the Republic of Belarus, issued by the official health authority of the country from which the applicant arrived and its copy, translated into russian and notarized;",
                    AddFile7:"7) Photo",

                    DD:"I give my consent to the processing, storage and use of personal data for a preliminary review of the admissions committee.",

                    ButtonUpload:"Send",
                    
                    WarningMessageOne:"After arriving in Belarus applicant will need to notarize the translation of passport in Belarus!!!",
                    WarningMessageTwo:"After arriving in Belarus applicant must pass a mandatory medical examination, confirming the absence of medical contraindications to study in the Republic of Belarus, issued by a healthcare organization of the Republic of Belarus!!!",
                    WarningMessageThree:"Applicants arriving for training will be interviewed on the following subjects: english language (russian language), chemisry amd biology.",

                    AttFile:"Attach file",


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
                    NameError:"В поле 'Имя' допустима только латиница, первая буква — заглавная.",

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
                    
                    DataOfIssueEdu:"Дата выдачи документа об образовании",
                    DataOfIssueEduErrorEmpty:"Поле 'Дата выдачи документа об образовании' обязательно для заполнения.",
                    DataOfIssueEduError:"Поле 'Дата выдачи документа об образовании' должно соответствовать формату 'дд.мм.гггг'.",

                    DateOfExiry:"Срок действия",
                    DateOfExiryErrorEmpty:"Поле 'Срок действия' обязательно для заполнения.",
                    DateOfExiryError:"Поле 'Срок действия' должно соответствовать формату 'дд.мм.гггг'.",

                    NatPassw:"Национальность, указанная в паспорте",
                    
                    EducationInfo:"Образование, информация про документ об образовании",

                    EducationInst:"Название учебного заведения, которое Вы окончили(школа, колледж и т.п.)",

                    EduSerialNumber:"Серия и номер документа об образовании",

                    InfoAdmission:"Информация о поступлении",

                    Faculty:"Факультет, на котором планируете проходить обучение, или подготовительные курсы",

                    FacName1:"Факультеты",
                    Fac1:"Лечебный",
                    Fac2:"Педиатрический",
                    Fac3:"Медико-профилактический",
                    Fac4:"Стоматологический",
                    Fac6:"Фармацевтический",
                    Fac20:"Фармацевтический (заочно)",
                    Fac7:"Профориентации и довузовской подготовки",
                    
                    FacName2:"Медицинский факультет иностранных учащихся",
                    Fac10:"Лечебный, русский язык обучения",
                    Fac11:"Лечебный, английский язык обучения",
                    Fac12:"Стоматологический, русский язык обучения",
                    Fac13:"Стоматологический, английский язык обучения",
                    Fac14:"Медико-профилактический, русский язык обучения",
                    Fac15:"Фармацевтический, русский язык обучения",
                    Fac16:"Фармацевтический, английский язык обучения",
                    Fac21:"Фармацевтический, русский язык обучения (заочно)",
                    
                    FacName3:"Военно-медицинский институт",
                    Fac8:"Вооруженные Силы",
                    Fac19:"Вооруженные Силы (лица женского пола)",
                    Fac17:"Внутренние войска",
                    Fac5:"Государственный пограничный комитет",
                    Fac9:"Министерство внутренних дел",
                    Fac18:"МЧС",

                    HostelLive:"Во время учёбы в БГМУ планируете жить в общежитии или снимать квартиру самостоятельно?",

                    AddDoc:"Прикрепить документы",

                    AddFile1:"1) Страниц паспорта, на которых имеется фото и номер паспорта, а также нотариально заверенный перевод на русский язык;",
                    AddFile2:"2) Оригинал аттестата об общем среднем образовании, и приложения к нему (лист и оценками) и нотариально заверенный перевод на русский язык;",
                    AddFile3:"3) Справка об отсутствии ВИЧ-инфекции, выданная официальным органом здравоохранения страны, из которой прибыл абитуриент, и её копия, переведённая на русский язык и нотариально заверенная;",
                    AddFile4:"4) Для несовершеннолетних (до 18 лет) абитуриентов: оригинал свидетельства о рождении и его копия, переведённая на русский язык и нотариально заверенная, или оригинал другого документа, подтверждающего дату рождения и гражданство, и его копия, переведённая на русский язык и нотариально заверенная;",
                    AddFile5:"5) Для несовершеннолетних (до 18 лет) абитуриентов: доверенность на представление интересов несовершеннолетнего и её копия, переведённая на русский язык и нотариально заверенная - в случае подачи документов без присутствия родителей/опекунов; ",
                    AddFile6:"6) Медицинская справка (заключение) о состоянии здоровья и пригодности к обучению в медицинском вузе, выданная официальным органом системы здравоохранения (поликлиникой, стационаром) страны проживания абитуриента (должна быть запись, что абитуриент физически здоров и пригоден к обучению), перевод её копии на русский язык, нотариально заверенный;",
                    AddFile7:"7) Фотография",

                    DD:"Я даю своё согласие на обработку, хранение и использование персональных данных для предварительного ознакомления приёмной комиссии.",
                
                    ButtonUpload:"Отправить",

                    WarningMessageOne:"После прибытия в Республику Беларусь абитуриенту необходимо будет нотариально заверить перевод паспорта в Республике Беларусь!!!",
                    WarningMessageTwo:"После прибытия в Республику Беларусь абитуриент должен пройти обязательное медицинское освидетельствование, подтверждающее отсутствие медицинских противопоказаний к обучению в Республике Беларусь, выданное организацией здравоохранения Республики Беларусь!!!",
                    WarningMessageThree:"Абитуриенты, прибывающие на обучение, будут проходить собеседование по следующим предметам: английский язык (русский язык), химия и биология.",
               
                    AttFile:"Прикрепить файл",


                }
            }
        },
        lng: "en", // if you're using a language detector, do not define the lng option
        fallbackLng: "en",

        interpolation: {
            escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
        }
    });