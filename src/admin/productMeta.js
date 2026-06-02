export const productCategoryMeta = {
    "Anesthesia & Respiratory Care": {
        brands: [
            "Intersurgical",
            "Fisher & Paykel",
            "ResMed",
            "Philips",
            "Apex"
        ],
        subcategories: [
            "Breathing Circuits",
            "Airway Management",
            "Endotracheal Tubes",
            "Supraglottic Airways",
            "Suction Products",
            "Regional Anaesthesia Products",
            "Oxygen Therapy",
            "Tracheostomy Care",
            "Nebulization Systems",
            "Humidification Systems"
        ]
    },
    "Laboratory Equipment & Consumables": {
        brands: ["Eppendorf", "Gilson", "Thermo Fisher"],
        subcategories: [
            "Hematology Analyzers",
            "Biochemistry Analyzers",
            "Immunoassay Systems",
            "PCR & Molecular Diagnostics",
            "ELISA Systems",
            "Blood Gas Analysis",
            "Laboratory Refrigeration",
            "Biosafety Equipment",
            "Laboratory Consumables",
            "Diagnostic Reagents",
            "Rapid Test Kits"
        ]
    },
    "Orthopedic Cast & Tapes": {
        brands: [],
        subcategories: [
            "Cast Tapes",
            "POP Bandages",
            "Splinting Materials",
            "Orthopedic Padding",
            "Kinesiology Tapes",
            "Sports Tapes",
            "Compression Bandages",
            "Orthopedic Braces & Supports"
        ]
    },
    "Blood Bank Equipment": {
        brands: [],
        subcategories: [
            "Blood Bank Refrigerators",
            "Plasma Freezers",
            "Platelet Storage Systems",
            "Blood Collection Equipment",
            "Blood Processing Equipment",
            "Blood Transport Solutions",
            "Blood Irradiation Systems"
        ]
    },
    "Orthopedic Implants": {
        brands: [],
        subcategories: [
            "Trauma Implants",
            "Locking Plates",
            "Screws",
            "Intramedullary Nails",
            "External Fixators",
            "Spine Implants",
            "Interbody Cages",
            "Joint Replacement Systems"
        ]
    },
    "Maxillofacial (CMF) Implants": {
        brands: [],
        subcategories: [
            "CMF Plate Systems",
            "Orbital Reconstruction",
            "Mandible Reconstruction",
            "Titanium Mesh",
            "Cranial Fixation Systems",
            "Resorbable CMF Systems",
            "Patient Specific Implants (PSI)"
        ]
    },
    "Surgical Sutures & Threads": {
        brands: [
            "Vicryl Type",
            "Dexon Type",
            "PDS Type",
            "Monocryl Type",
            "Ethilon Type",
            "Prolene Type",
            "Mersilk Type",
            "Ethibond Type",
            "Ti-Cron Type",
            "V-Loc Type",
            "Quill Type"
        ],
        subcategories: [
            "Absorbable Sutures",
            "Non-Absorbable Sutures",
            "Specialty Sutures",
            "Antibacterial Sutures"
        ]
    },
    "Medical Equipment": {
        brands: ["Mindray", "GE Healthcare", "Philips"],
        subcategories: [
            "Patient Monitoring",
            "ICU Equipment",
            "Ventilators",
            "Infusion & Syringe Pumps",
            "Defibrillators",
            "Anaesthesia Equipment",
            "Operating Room Equipment",
            "Hospital Furniture",
            "Diagnostic Imaging",
            "ECG Systems",
            "Ultrasound Systems",
            "X-Ray Systems"
        ]
    },
    "Medical Equipments": {
        brands: ["Remi", "Qualigens", "Himedia", "Diatron", "Analyticon", "Kapitol", "Sinocare", "Sartorius", "Agappe", "Radiant"],
        subcategories: []
    },
    "Laboratory Equipments": {
        brands: ["Remi", "Qualigens", "Himedia", "Diatron", "Analyticon", "Kapitol", "Sinocare", "Sartorius", "Agappe", "Radiant"],
        subcategories: []
    },
    "Surgical": {
        brands: ["Remi", "Qualigens", "Himedia", "Diatron", "Analyticon", "Kapitol", "Sinocare", "Sartorius", "Agappe", "Radiant"],
        subcategories: []
    },
    "Orthopedic Products": {
        brands: ["Remi", "Qualigens", "Himedia", "Diatron", "Analyticon", "Kapitol", "Sinocare", "Sartorius", "Agappe", "Radiant"],
        subcategories: []
    },
    "PPE": {
        brands: ["Remi", "Qualigens", "Himedia", "Diatron", "Analyticon", "Kapitol", "Sinocare", "Sartorius", "Agappe", "Radiant"],
        subcategories: []
    },
    "Gloves": {
        brands: ["Remi", "Qualigens", "Himedia", "Diatron", "Analyticon", "Kapitol", "Sinocare", "Sartorius", "Agappe", "Radiant"],
        subcategories: []
    },
    "Sanitizers": {
        brands: ["Remi", "Qualigens", "Himedia", "Diatron", "Analyticon", "Kapitol", "Sinocare", "Sartorius", "Agappe", "Radiant"],
        subcategories: []
    }
};

export const categoryOptions = Object.keys(productCategoryMeta).map((value) => ({
    value,
    label: value
}));

export const getCategoryMeta = (category) => productCategoryMeta[category] || { brands: [], subcategories: [] };
