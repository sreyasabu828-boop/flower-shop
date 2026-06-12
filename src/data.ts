import { Flower } from './types';

export const INITIAL_FLOWERS: Flower[] = [
  {
    id: 'rose-veranda',
    name: 'The Rose Veranda',
    price: 85.00,
    tags: 'Dusty Pink & Cream',
    description: 'A premium arrangement of dusty pink and cream roses in a minimalist ceramic vase, set against a soft warm white background with natural morning sunlight casting gentle shadows. Sourced from organic heritage growers, these select roses feature extremely high petal counts and a sweet tea-rose aroma.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6KfWyxXomiWAnHMsH-H3XlL9QNvaSdkexKzRTV_KoLHBlNvgJpdxd6cR3mkrmOTLhuXkL2OU2jb7j0EYArCrD4uBVYHRhYBTe7zFufvqm20lVRrpBPWtj1w--NqXzlligLZs781e5zQF16KJJuh03XJo7wnZUT1r-U6cXwJDpcfX8baYjd66uyLLNKAOm27cHj1bDXQnwNlVhlaA-1WCn1WFxvPXftmX3Sw2ht0kZkhh4C8d8TRO8iM9D3cTu8edFNt8Tx0v-ANk',
    colors: ['#F5E6E8', '#FFFDF9', '#7B5455'],
    colorNames: ['Dusty Pink', 'Cream White', 'Deep Mauve'],
    category: 'Romance'
  },
  {
    id: 'morning-serenity',
    name: 'Morning Serenity',
    price: 110.00,
    tags: 'Lily & Eucalyptus',
    description: 'An elegant bouquet of pure white lilies and eucalyptus stems arranged in a tall, slender glass vase. The scene is bright and airy, flooded with soft daylight that highlights the crisp textures of the petals. Perfect for conveying comfort and tranquil peace.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsrzkZxt0v2Tuk7cYQlmRcadwTZEnNNsL7RWN8Qn-O5jz2rwCItJ1Piz-CuSsj01hkQZH1hxK5l8hHYag7fB2zv29evYlOWoT99PjiVuU4oICroV9XyDQ0jlXhbrG8mDeMNaKv0RKA8pRXeV-Uf7Dn-bfOJ7eHg1erYamMmyXFtWlAzs8sCOikM-zBMBVZFdPjWpgID_Oc9NknXRfR6VYpojt4LaJxi2tvTUlqUDPH-sq2Km8R8bQiWs4kfs6TUuFfTI7grqVhg7o',
    colors: ['#FFFFFF', '#A7B9A7'],
    colorNames: ['Pure White', 'Sage Green'],
    category: 'Sympathy'
  },
  {
    id: 'golden-solstice',
    name: 'Golden Solstice',
    price: 72.00,
    tags: 'Sunflower & Thistle',
    description: 'A wild, asymmetrical arrangement of sunflowers and blue thistles in a rustic earthenware pot. The composition feels organic and fresh, set in a bright garden studio with subtle wooden textures. Delivers immediate sunshine and positive energy.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0rvov7bm1CmhNh6exVyRannU705GpGPMqtAF6qbTntSU4PuXh9xJYSwYeQZPxgOB_dwIn4-9WSKEerz_ON2nunidi6sYlYBMUYk4JWD6CN_TaRRZjhPz_KS_OHk4nYw4zM0dRiMjKDjrQlvI6YyWuu5GcxLNXS2FJ3mKQvvYBcScOCj2CjiH9Q3v5VieznPNJcnB6kFV-nhSyYlfEbWtd4Yj9HdEUlqcwPMR8_EUtL-tAVCKJdnT3M_Os0VCxkSqN534YQJcABFc',
    colors: ['#FFD700', '#4682B4', '#8B4513'],
    colorNames: ['Sun Yellow', 'Steel Blue', 'Terra Cotta'],
    category: 'Celebration'
  },
  {
    id: 'pastel-whisper',
    name: 'Pastel Whisper',
    price: 95.00,
    tags: 'Ranunculus Mix',
    description: 'A vibrant mix of ranunculus and sweet peas in soft pastel shades of peach, lavender, and butter yellow. The arrangement is showcased in a delicate glass bowl on a marble tabletop. Breathable, delicate, and deeply aromatic.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEVju_3jTx0iSuiKzngMzG8MVRQxg0rd8QWoH9-PCjvzmCytOPFJoAf_q8OaKALPvdtMZGjgVXvezVaFXFdgv7EwHCoCYlJE7FDG_HP3L14dIPUAk0WBBFXPFNz6DAhxXrHJmlXgLkchbemN8nbDaWOckHpkXoIytQmf60RXNAYO7qHq0-_AGDh8jnV4B-TQpPlNQvL8IPSRxCz7vC0OlS-q_NlUMnM4MkspD_zi3LoLHL2f66o0fbik73rqXsj5g_ogP0YJbqLTo',
    colors: ['#FFCC99', '#E6E6FA', '#FFF44F'],
    colorNames: ['Peach', 'Lavender', 'Butter'],
    category: 'Housewarming'
  },
  {
    id: 'midnight-rose',
    name: 'Midnight Rose',
    price: 85.00,
    tags: 'Midnight Rose',
    description: `The 'Midnight Rose' is a masterpiece of botanical elegance. Sourced from our private nurseries, these blooms feature a depth of color that transitions from a rich scarlet to near-infinite darkness at the edges.

Each bouquet is hand-curated by our master florists, paired with aromatic eucalyptus and preserved fern leaves to create a sensory experience that lingers long after the first glance. Perfect for moments that demand gravitas and beauty.`,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzkBsXXE9vVIRBFqiB0ZJXk117v0v4n24mQc3mE49eVB5upZqJYhVJ87LWLbtdSwvFuuC626yYJFv4l4F-QErI_eh3ECPqMitHcYv3Tnmb8FSXmv3yp2YjfP9Dzjxh3e_piyXSEJXm6zUovyi8wSCvMpQY4AkZK2q0OwoLzqcJX5VVqQrWEjbUPLw8c8PXvVcGVjtze11VwwKQhzkowOxBS3zoogiDj7u1XqE4HyWMu7SZo5DervuLRZ_uDrKpexLpjVDUCUxyzgs',
    colors: ['#800020', '#FFFFFF', '#F5C2C1'],
    colorNames: ['Red', 'White', 'Pink'],
    category: 'Romance'
  }
];

export const PRESET_FLOWERS_IMAGES = [
  {
    name: 'Rose Bouquet',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6KfWyxXomiWAnHMsH-H3XlL9QNvaSdkexKzRTV_KoLHBlNvgJpdxd6cR3mkrmOTLhuXkL2OU2jb7j0EYArCrD4uBVYHRhYBTe7zFufvqm20lVRrpBPWtj1w--NqXzlligLZs781e5zQF16KJJuh03XJo7wnZUT1r-U6cXwJDpcfX8baYjd66uyLLNKAOm27cHj1bDXQnwNlVhlaA-1WCn1WFxvPXftmX3Sw2ht0kZkhh4C8d8TRO8iM9D3cTu8edFNt8Tx0v-ANk'
  },
  {
    name: 'White Lilies',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsrzkZxt0v2Tuk7cYQlmRcadwTZEnNNsL7RWN8Qn-O5jz2rwCItJ1Piz-CuSsj01hkQZH1hxK5l8hHYag7fB2zv29evYlOWoT99PjiVuU4oICroV9XyDQ0jlXhbrG8mDeMNaKv0RKA8pRXeV-Uf7Dn-bfOJ7eHg1erYamMmyXFtWlAzs8sCOikM-zBMBVZFdPjWpgID_Oc9NknXRfR6VYpojt4LaJxi2tvTUlqUDPH-sq2Km8R8bQiWs4kfs6TUuFfTI7grqVhg7o'
  },
  {
    name: 'Sunflowers & Blue Thistle',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0rvov7bm1CmhNh6exVyRannU705GpGPMqtAF6qbTntSU4PuXh9xJYSwYeQZPxgOB_dwIn4-9WSKEerz_ON2nunidi6sYlYBMUYk4JWD6CN_TaRRZjhPz_KS_OHk4nYw4zM0dRiMjKDjrQlvI6YyWuu5GcxLNXS2FJ3mKQvvYBcScOCj2CjiH9Q3v5VieznPNJcnB6kFV-nhSyYlfEbWtd4Yj9HdEUlqcwPMR8_EUtL-tAVCKJdnT3M_Os0VCxkSqN534YQJcABFc'
  },
  {
    name: 'Ranunculus & Sweet Peas',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEVju_3jTx0iSuiKzngMzG8MVRQxg0rd8QWoH9-PCjvzmCytOPFJoAf_q8OaKALPvdtMZGjgVXvezVaFXFdgv7EwHCoCYlJE7FDG_HP3L14dIPUAk0WBBFXPFNz6DAhxXrHJmlXgLkchbemN8nbDaWOckHpkXoIytQmf60RXNAYO7qHq0-_AGDh8jnV4B-TQpPlNQvL8IPSRxCz7vC0OlS-q_NlUMnM4MkspD_zi3LoLHL2f66o0fbik73rqXsj5g_ogP0YJbqLTo'
  },
  {
    name: 'Midnight Rose Selection',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzkBsXXE9vVIRBFqiB0ZJXk117v0v4n24mQc3mE49eVB5upZqJYhVJ87LWLbtdSwvFuuC626yYJFv4l4F-QErI_eh3ECPqMitHcYv3Tnmb8FSXmv3yp2YjfP9Dzjxh3e_piyXSEJXm6zUovyi8wSCvMpQY4AkZK2q0OwoLzqcJX5VVqQrWEjbUPLw8c8PXvVcGVjtze11VwwKQhzkowOxBS3zoogiDj7u1XqE4HyWMu7SZo5DervuLRZ_uDrKpexLpjVDUCUxyzgs'
  }
];
