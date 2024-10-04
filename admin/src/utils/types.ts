export interface SliderVideo{
    id:string
    videoUrl:string;
}

export interface Contact{
    id:string;
    phoneNumber:string;
    email:string;
    fax:string;
    location:string;
    city:string;
    socials: Record<string, string | null | undefined>;
}

export interface Career{
    id:string;
    title:string;
    description:string;
    date:string;
}

export interface Translation{
    languageCode:string;
    title:string;
    description?:string;
    expiredDate?: Date;
    content?: string;
    id?:string;
}
export interface Media {
    image: string;
    id?:string;
    translations:{
        title: string;
        description: string;
        languageCode: string;
    }[]
}


export interface Info {
    id?:string;
    translations:{
        title: string;
        description?: string;
        languageCode: string;
    }[]
}

export interface Value {
    id?:string;
    title: string;
    description: string;
}

export interface Language {
    id: string;
    name: string;
    code: string;
}

export interface CompanyCard{
    id: string;
    title: string;
    category: string;
    description: string;
    languageCode: string;
    translations?: Translation[]
}

export interface Company{
    id?:string;
    title:string;
    description?:string;
    companyCards?:CompanyCard[]
}