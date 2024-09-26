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
    description:string;
    expiredDate?: Date;
}
export interface Media {
    image: string;
    id:string;
    translations:{
        title: string;
        description: string;
        languageCode: string;
    }[]
}