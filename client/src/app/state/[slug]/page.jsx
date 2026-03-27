import StateProducts from "@/components/core/SiteWise/StateProducts";

const STATES = [
  { slug: "jammu-and-kashmir",  name: "Jammu and Kashmir" },
  { slug: "himachal-pradesh",   name: "Himachal Pradesh" },
  { slug: "uttarakhand",        name: "Uttarakhand" },
  { slug: "manipur",            name: "Manipur" },
  { slug: "nagaland",           name: "Nagaland" },
  { slug: "assam",              name: "Assam" },
  { slug: "rajasthan",          name: "Rajasthan" },
  { slug: "uttar-pradesh",      name: "Uttar Pradesh" },
  { slug: "bihar",              name: "Bihar" },
  { slug: "west-bengal",        name: "West Bengal" },
  { slug: "maharashtra",        name: "Maharashtra" },
  { slug: "kerala",             name: "Kerala" },
  { slug: "tamil-nadu",         name: "Tamil Nadu" },
  { slug: "karnataka",          name: "Karnataka" },
  { slug: "gujarat",            name: "Gujarat" },
  { slug: "punjab",             name: "Punjab" },
  { slug: "odisha",             name: "Odisha" },
  { slug: "madhya-pradesh",     name: "Madhya Pradesh" },
];

export function generateStaticParams() {
  return STATES.map(({ slug }) => ({ slug }));
}

export default async function StateProductsPage({ params }) {
  const { slug } = await params;
  const state = STATES.find((s) => s.slug === slug);
  const stateName = state?.name ?? slug.replace(/-/g, " ");

  return <StateProducts stateName={stateName} />;
}
