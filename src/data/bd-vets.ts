import { VetClinic } from "@/services/VetService";
import { MOCK_VET_CLINICS } from "@/data/vets";

export const REAL_BD_VETS: Omit<VetClinic, "id">[] = MOCK_VET_CLINICS.map(
    ({ id, ...rest }) => ({
        ...rest,
        legacy_id: id,
    })
);
