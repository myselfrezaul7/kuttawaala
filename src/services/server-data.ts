import { MOCK_VET_CLINICS, VetClinic } from "@/data/vets";
import { dogs, Dog } from "@/data/dogs";
// import { createClient } from "@/utils/supabase/server"; // TODO: Uncomment when Supabase is set up

export async function getVets(): Promise<VetClinic[]> {
    // TODO: Uncomment this block to enable Supabase data fetching
    /*
    try {
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
          return [...MOCK_VET_CLINICS];
      }
      
      const { createClient } = await import("@/utils/supabase/server");
      const supabase = await createClient();
  
      const { data, error } = await supabase.from('vets').select('*');
      if (error || !data) {
          console.warn("Supabase Fetch Error (Vets):", error);
          return [...MOCK_VET_CLINICS];
      }
      return data as VetClinic[];
    } catch (e) {
        console.warn("Supabase Client Init Error:", e);
        return [...MOCK_VET_CLINICS];
    }
    */
    return [...MOCK_VET_CLINICS];
}

export async function getCats(): Promise<Dog[]> {
    // TODO: Uncomment this block to enable Supabase data fetching
    /*
    try {
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
          return [...dogs];
      }
  
      const { createClient } = await import("@/utils/supabase/server");
      const supabase = await createClient();
  
      const { data, error } = await supabase.from('dogs').select('*');
      if (error || !data) {
           console.warn("Supabase Fetch Error (Dogs):", error);
          return [...dogs];
      }
      return data as Dog[];
    } catch (e) {
        return [...dogs];
    }
    */
    return [...dogs];
}

export type Report = {
    id: string;
    type: 'Lost' | 'Found' | 'Injured';
    description: string;
    latitude: number;
    longitude: number;
    location_text: string;
    contact_info: string;
    image_url: string | null;
    user_id: string | null;
    status: 'Open' | 'Resolved';
    created_at: string;
};

export type Memorial = {
    id: string;
    pet_name: string;
    owner_name: string;
    tribute: string;
    image_url: string | null;
    user_id: string | null;
    created_at: string;
};
