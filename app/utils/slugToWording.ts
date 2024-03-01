export const WORDINGS = {
    'dessert': 'Dessert',
    'petitdej': 'Petit déjeuner',
    'apero': 'Apéritif',
    'entree': 'Entrées',
    'vegetarien': 'Végétarien',
    'plats': 'Plats',
    'boissons': 'Boissons',
    'autres': 'Autres',
    'antigaspi': 'Anti-gaspi',
    'antiinflam': 'Anti-inflammatoire',
    'zerodechet': 'Zéro Déchet',
    '/': 'Accueil',
};

export type Wording = keyof typeof WORDINGS;

export function isKnownSlug(slug: string): slug is Wording {
    return slug in WORDINGS;
}