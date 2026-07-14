/* FourTres — shared inspection checklist (v4)
   Imported by inspection.html and report.html so both always render — and
   SCORE — the same items. Base checklist + property-type modules.

   v4: weighted scoring. Item tuples are [key, label, weight].
     weight 3 = critical (life safety / code / ADA exposure)
     weight 2 = liability (injury or loss exposure)
     weight 1 = condition / housekeeping (omitted in the tuple)
   Scores are weighted averages. Any weight-3 item rated Deficient caps the
   containing domain score AND the overall score at CRITICAL_CAP (69 — below
   the "Satisfactory" band), so a property can never look healthy while a
   critical condition is failing. Use scoreDetail() everywhere; do not
   re-implement scoring in pages.

   v2 note: keys sa_vegetation, sa_debris, sa_trip, li_dark, co_reg_sign,
   co_hazards were removed. Old drafts keep those ratings in JSONB but they
   no longer render or score. */

export const DOMAINS={
  safety:{name:'Safety',theme:'s-safety',color:'#1F4E79',blurb:'Life safety \u00b7 access \u00b7 site hazards',groups:[
    {name:'Fire & Life Safety',items:[['sa_exit_doors','Exit doors accessible',3],['sa_exit_paths','Exit paths unobstructed',3],['sa_exit_signs','Exit signs visible & illuminated',3],['sa_emerg_light','Emergency lighting operational',3],['sa_extinguishers','Fire extinguishers accessible & mounted',3],['sa_ext_tags','Extinguisher inspection tags current',2]]},
    {name:'Walking Surfaces',items:[['sa_sidewalks','Walkways & sidewalks free of trip hazards',2],['sa_stairs','Stairs in good condition',2],['sa_handrails','Handrails secure on stairs & ramps',2],['sa_curbs','Curb edges visible / marked'],['sa_drainage','Drainage adequate \u2014 no ponding']]},
    {name:'Building Entry & Accessibility',items:[['ada_entrance','Accessible entrance identified & signed',3],['ada_door','Entry door hardware operable \u00b7 threshold \u2264 1/2 in',3],['ada_ramp','Ramps: slope OK, handrails both sides, landings clear',3]]},
    {name:'Site Conditions',items:[['sa_bldg_numbers','Building / suite numbers visible from street'],['sa_housekeeping','Housekeeping & debris acceptable']]}
  ]},
  security:{name:'Security',theme:'s-security',color:'#2E7D32',blurb:'Perimeter \u00b7 access \u00b7 surveillance',groups:[
    {name:'Perimeter',items:[['se_fencing','Fencing secure',2],['se_gates','Gates functional',2]]},
    {name:'Cameras',items:[['se_cam_obstruct','Cameras unobstructed',2],['se_cam_coverage','Camera coverage adequate',2]]},
    {name:'Access Control',items:[['se_access','Access control functioning',2],['se_restricted','Restricted areas protected',2]]},
    {name:'CPTED',items:[['se_landscape','Landscaping maintained \u2014 clear sight lines'],['se_surveillance','Natural surveillance adequate'],['se_territorial','Territorial reinforcement visible'],['se_graffiti','Graffiti absent']]}
  ]},
  lighting:{name:'Lighting',theme:'s-lighting',color:'#00838F',blurb:'Illumination & uniformity',groups:[
    {name:'Parking Lot Lighting',items:[['li_lot','Parking lot lighting adequate',2],['li_poles','Pole conditions acceptable']]},
    {name:'Walkways & Entrances',items:[['li_walkways','Walkways illuminated',2],['li_entrances','Entrances illuminated',2]]},
    {name:'General Lighting',items:[['li_fixtures','Fixtures operational \u2014 no outages',2],['li_uniformity','Lighting uniform \u2014 no dark spots']]}
  ]},
  traffic:{name:'Traffic & Parking',theme:'s-traffic',color:'#EF6C00',blurb:'Circulation \u00b7 parking \u00b7 ADA',groups:[
    {name:'Striping & Markings',items:[['tr_striping','Parking stall striping visible & maintained'],['tr_firelane','Fire lane marked & unobstructed',3]]},
    {name:'Accessible Parking (ADA)',items:[['ada_count','Accessible space count meets ADA table',3],['ada_van','Van-accessible space provided (1 per 6)',3],['ada_aisle','Access aisles striped & unobstructed',3],['ada_signs','ISA signs posted at each space \u2014 60 in min height',3],['ada_route','Spaces on shortest accessible route to entrance',3]]},
    {name:'Pedestrian Safety',items:[['tr_crosswalks','Crosswalks marked \u2014 paint in good condition',2],['tr_pathways','Pedestrian pathways marked & unobstructed',2],['ada_curb','Curb ramps present \u00b7 detectable warnings intact',3]]},
    {name:'Signs & Vehicle Control',items:[['tr_signs','Traffic & regulatory signs visible'],['tr_bollards','Bollards adequate at entries / storefronts',2],['tr_circulation','Vehicle circulation clear'],['tr_speed','Speed control devices present']]}
  ]},
  compliance:{name:'Compliance & Risk',theme:'s-compliance',color:'#6A1B9A',blurb:'Postings \u00b7 records \u00b7 findings',groups:[
    {name:'Required Postings',items:[['co_safety_sign','Required safety signage posted',2],['co_occupancy','Occupancy load posted (assembly areas)',2],['co_nosmoke','No-smoking signage posted where required'],['co_emerg_info','Emergency contact info posted',2]]},
    {name:'Previous Findings',items:[['co_prev','Previous deficiencies corrected',3]]},
    {name:'Records',items:[['co_actions','Corrective actions tracked',2],['co_records','Inspection & maintenance records available',2]]}
  ]}
};

/* Property-type modules — groups appended to base domains.
   Key prefixes: of_ rt_ rs_ wh_ au_ (never collide with base sa_/se_/li_/tr_/co_/ada_). */
export const MODULES={
  office:{name:'Office',adds:{
    safety:[{name:'Building Systems (Office)',items:[['of_elevator','Elevator inspection certificate current',3],['of_mech','Mech & electrical rooms locked \u00b7 36 in panel clearance',2],['of_stairs','Stairwell doors self-close & latch',3],['of_water','No water intrusion signs \u2014 ceilings, mech rooms']]}],
    security:[{name:'After-Hours & Garage',items:[['of_afterhours','After-hours access controlled & logged',2],['of_garage','Garage lighting & emergency call stations operational',2]]}]
  }},
  retail:{name:'Retail / Strip Center',adds:{
    safety:[{name:'Storefront & Interior (Retail)',items:[['rt_glass','Storefront glazing intact \u2014 no cracks',2],['rt_aisles','Aisles & egress paths 36 in min, unobstructed',3],['rt_stock','Overhead stock secured \u2014 nothing loose above head height',2]]}],
    security:[{name:'Vacancy',items:[['rt_vacant','Vacant suites secured, posted & documented',2]]}],
    traffic:[{name:'Frontage (Retail)',items:[['rt_carts','Cart corrals present & maintained'],['rt_wheelstops','Wheel stops intact \u2014 not displaced into walkways',2],['rt_tenant_sign','Tenant signage secure \u2014 no loose panels',2]]}]
  }},
  restaurant:{name:'Restaurant / Food Service',adds:{
    safety:[{name:'Kitchen Fire Protection',items:[['rs_hood_tag','Hood suppression service tag current (6-month)',3],['rs_ul300','Suppression system UL 300 listed',3],['rs_kclass','Class K extinguisher within 30 ft of fryers',3],['rs_hood_clean','Hood, duct & filters free of grease buildup',3],['rs_fryer','Fryer clearance from open flame \u2014 16 in or baffle',3]]},
      {name:'Kitchen Safety',items:[['rs_mats','Slip-resistant mats at cook line & dish area',2],['rs_walkin','Walk-in coolers open from inside',3],['rs_rear_exit','Rear / service exit unobstructed',3]]}],
    compliance:[{name:'Restaurant Records',items:[['rs_grease','Grease trap service records current',2],['rs_permits','Health permit & occupancy posted',2],['rs_greasebin','Grease bin 10 ft from building \u00b7 lids closed',2]]}]
  }},
  warehouse:{name:'Warehouse / Industrial',adds:{
    safety:[{name:'Storage & Racking',items:[['wh_racking','Racking anchored, plumb & undamaged',3],['wh_sprinkler_cl','18 in clearance below sprinkler heads',3],['wh_flam','Flammables in listed storage cabinets',3],['wh_charging','Battery / forklift charging area ventilated & clear',2]]}],
    traffic:[{name:'Dock & Yard',items:[['wh_docks','Dock levelers, edges & doors in good condition',2],['wh_chocks','Wheel chocks / dock locks in use',2],['wh_ped_lanes','Pedestrian lanes marked in forklift areas',3]]}]
  }},
  auto:{name:'Auto Service',adds:{
    safety:[{name:'Shop Equipment (Auto)',items:[['au_lifts','Vehicle lifts \u2014 certification current, no leaks',3],['au_cylinders','Compressed gas cylinders secured upright',3],['au_fluids','Waste oil & fluids stored, labeled \u00b7 no floor staining',2],['au_pits','Service pits guarded when not in use',3]]}],
    compliance:[{name:'Auto Records',items:[['au_disposal','Hazmat / waste disposal manifests available',2]]}]
  }}
};

export const TEMPLATES=[['base','General / Base'],['office','Office'],['retail','Retail / Strip Center'],['restaurant','Restaurant / Food Service'],['warehouse','Warehouse / Industrial'],['auto','Auto Service']];

/* Map a free-text properties.property_type to a template key. */
export function detectTemplate(t){
  t=String(t||'').toLowerCase();
  if(/restaurant|food|bar|cafe|kitchen|brewery/.test(t))return 'restaurant';
  if(/retail|strip|shop|store|mall|plaza/.test(t))return 'retail';
  if(/warehouse|industrial|flex|distribution|manufactur|storage/.test(t))return 'warehouse';
  if(/auto|garage|repair|car wash|tire|lube/.test(t))return 'auto';
  if(/office|medical|professional|bank/.test(t))return 'office';
  return 'base';
}

/* Base domains + the chosen module's groups appended to each domain. */
export function composeDomains(key){
  const out={};
  for(const [dk,d] of Object.entries(DOMAINS))out[dk]={...d,groups:[...d.groups]};
  const mod=MODULES[key];
  if(mod)for(const [dk,groups] of Object.entries(mod.adds))if(out[dk])out[dk]={...out[dk],groups:[...out[dk].groups,...groups]};
  return out;
}

/* ---------- weighted scoring (single source of truth) ---------- */
export const CRITICAL_CAP=69; // lands in "Needs improvement", below the 70 "Satisfactory" line

export function itemWeight(item){return item[2]||1;}

/* [ [key,weight], ... ] for one domain object. */
export function domainEntries(domain){
  const out=[];for(const g of domain.groups)for(const it of g.items)out.push([it[0],it[2]||1]);return out;
}

/* [ [key,weight], ... ] for a whole composed-domains map. */
export function entriesOf(domains){
  const out=[];for(const d of Object.values(domains))out.push(...domainEntries(d));return out;
}

/* Weighted score of rated entries. a=1, w=0.5, d=0, n/unrated excluded.
   Returns {score, raw, crit, capped}:
     score  — final 0–100 (capped), or null if nothing rated
     raw    — uncapped weighted score
     crit   — a weight-3 item is rated Deficient
     capped — the cap actually lowered the score */
export function scoreDetail(entries,ratings){
  ratings=ratings||{};
  let num=0,den=0,crit=false;
  for(const [k,w] of entries){
    const v=ratings[k];
    if(!v||v==='n')continue;
    num+=(v==='a'?1:v==='w'?0.5:0)*w;den+=w;
    if(w>=3&&v==='d')crit=true;
  }
  if(!den)return {score:null,raw:null,crit:false,capped:false};
  const raw=Math.round(num/den*100);
  const capped=crit&&raw>CRITICAL_CAP;
  return {score:capped?CRITICAL_CAP:raw,raw,crit,capped};
}
