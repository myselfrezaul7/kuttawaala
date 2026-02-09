import { createClient } from "@/utils/supabase/client";
import { dogs, Dog } from "@/data/dogs";

export const DogService = {
    async getAllCats(): Promise<Dog[]> {
        const supabase = createClient();

        const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        if (!isSupabaseConfigured) {
            return dogs;
        }

        const { data, error } = await supabase
            .from('dogs')
            .select('*');

        if (error || !data || data.length === 0) {
            return dogs;
        }

        return data as Dog[];
    },

    async getCatById(id: string): Promise<Dog | undefined> {
        const supabase = createClient();
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return dogs.find(c => c.id === id);

        const { data, error } = await supabase
            .from('dogs')
            .select('*')
            .eq('id', id)
            .single();

        if (error || !data) return dogs.find(c => c.id === id);

        return data as Dog;
    }
};
