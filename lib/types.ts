// types.ts

export interface Service {
  id: number;
  name: string;
  slug: string;
  icon: string | null;
  image: string | null;
  pivot: {
    project_id: number;
    service_id: number;
  };
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
  pivot: {
    project_id: number;
    tag_id: number;
  };
}

export interface Client {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  country: string | null;
  logo: string | null;
}

export interface ProjectType {
  id: number;
  name: string;
  slug: string;
}

export interface Project {
  id: number;
  name: string;
  slug: string;
  client_id: number;
  type_id: number;
  region: string;
  description: string | null;
  image: string;
  gallery: string[];
  video_url: string | null;
  location: string;
  date: string;
  pax: string;
  is_featured: boolean;
  is_active: boolean;
  type: ProjectType;
  services: Service[];
  tags: Tag[];
  client: Client;
}
