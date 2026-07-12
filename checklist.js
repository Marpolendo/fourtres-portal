/* FourTres — shared inspection checklist (v3)
   Imported by inspection.html (and, later, the report generator) so both
   always render the same items. Base checklist + property-type modules.

   v2 note: keys sa_vegetation, sa_debris, sa_trip, li_dark, co_reg_sign,
   co_hazards were removed. Old drafts keep those ratings in JSONB but they
   no longer render or score. */

export const DOMAINS={
  safety:{name:'Safety',theme:'s-safety',color:'#1F4E79',blurb:'Life safety \u00b7 access \u00b7 site hazards',groups:[
    {name:'Fire & Life Safety',items:[['sa_exit_doors','Exit doors accessible'],['sa_exit_paths','Exit paths unobstructed'],['sa_exit_signs','Exit signs visible & illuminated'],['sa_emerg_light','Emergency lighting operational'],['sa_extinguishers','Fire extinguishers accessible & mounted'],['sa_ext_tags','Extinguisher inspection tags current']]},
    {name:'Walking Surfaces',items:[['sa_sidewalks','Walkways & sidewalks free of trip hazards'],['sa_stairs','Stairs in good condition'],['sa_handrails','Handrails secure on stairs & ramps'],['sa_curbs','Curb edges visible / marked'],['sa_drainage','Drainage adequate \u2014 no ponding']]},
    {name:'Building Entry & Accessibility',items:[['ada_entrance','Accessible entrance identified & signed'],['ada_door','Entry door hardware operable \u00b7 threshold \u2264 1/2 in'],['ada_ramp','Ramps: slope OK, handrails both sides, landings clear']]},
    {name:'Site Conditions',items:[['sa_bldg_numbers','Building / suite numbers visible from street'],['sa_housekeeping','Housekeeping & debris acceptable']]}
  ]},
  security:{name:'Security',theme:'s-security',color:'#2E7D32',blurb:'Perimeter \u00b7 access \u00b7 surveillance',groups:[
    {name:'Perimeter',items:[['se_fencing','Fencing secure'],['se_gates','Gates functional']]},
    {name:'Cameras',items:[['se_cam_obstruct','Cameras unobstructed'],['se_cam_coverage','Camera coverage adequate']]},
    {name:'Access Control',items:[['se_access','Access control functioning'],['se_restricted','Restricted areas protected']]},
    {name:'CPTED',items:[['se_landscape','Landscaping maintained \u2014 clear sight lines'],['se_surveillance','Natural surveillance adequate'],['se_territorial','Territorial reinforcement visible'],['se_graffiti','Graffiti absent']]}
  ]},
  lighting:{name:'Lighting',theme:'s-lighting',color:'#00838F',blurb:'Illumination & uniformity',groups:[
    {name:'Parking Lot Lighting',items:[['li_lot','Parking lot lighting adequate'],['li_poles','Pole conditions acceptable']]},
    {name:'Walkways & Entrances',items:[['li_walkways','Walkways illuminated'],['li_entrances','Entrances illuminated']]},
    {name:'General Lighting',items:[['li_fixtures','Fixtures operational \u2014 no outages'],['li_uniformity','Lighting uniform \u2014 no dark spots']]}
  ]},
  traffic:{name:'Traffic & Parking',theme:'s-traffic',color:'#EF6C00',blurb:'Circulation \u00b7 parking \u00b7 ADA',groups:[
    {name:'Striping & Markings',items:[['tr_striping','Parking stall striping visible & maintained'],['tr_firelane','Fire lane marked & unobstructed']]},
    {name:'Accessible Parking (ADA)',items:[['ada_count','Accessible space count meets ADA table'],['ada_van','Van-accessible space provided (1 per 6)'],['ada_aisle','Access aisles striped & unobstructed'],['ada_signs','ISA signs posted at each space \u2014 60 in min height'],['ada_route','Spaces on shortest accessible route to entrance']]},
    {name:'Pedestrian Safety',items:[['tr_crosswalks','Crosswalks marked \u2014 paint in good condition'],['tr_pathways','Pedestrian pathways marked & unobstructed'],['ada_curb','Curb ramps present \u00b7 detectable warnings intact']]},
    {name:'Signs & Vehicle Control',items:[['tr_signs','Traffic & regulatory signs visible'],['tr_bollards','Bollards adequate at entries / storefronts'],['tr_circulation','Vehicle circulation clear'],['tr_speed','Speed control devices present']]}
  ]},
  compliance:{name:'Compliance & Risk',theme:'s-compliance',color:'#6A1B9A',blurb:'Postings \u00b7 records \u00b7 findings',groups:[
    {name:'Required Postings',items:[['co_safety_sign','Required safety signage posted'],['co_occupancy','Occupancy load posted (assembly areas)'],['co_nosmoke','No-smoking signage posted where required'],['co_emerg_info','Emergency contact info posted']]},
    {name:'Previous Findings',items:[['co_prev','Previous deficiencies corrected']]},
    {name:'Records',items:[['co_actions','Corrective actions tracked'],['co_records','Inspection & maintenance records available']]}
  ]}
};

/* Property-type modules — groups appended to base domains.
   Key prefixes: of_ rt_ rs_ wh_ au_ (never collide with base sa_/se_/li_/tr_/co_/ada_). */
export const MODULES={
  office:{name:'Office',adds:{
    safety:[{name:'Building Systems (Office)',items:[['of_elevator','Elevator inspection certificate current'],['of_mech','Mech & electrical rooms locked \u00b7 36 in panel clearance'],['of_stairs','Stairwell doors self-close & latch'],['of_water','No water intrusion signs \u2014 ceilings, mech rooms']]}],
    security:[{name:'After-Hours & Garage',items:[['of_afterhours','After-hours access controlled & logged'],['of_garage','Garage lighting & emergency call stations operational']]}]
  }},
  retail:{name:'Retail / Strip Center',adds:{
    safety:[{name:'Storefront & Interior (Retail)',items:[['rt_glass','Storefront glazing intact \u2014 no cracks'],['rt_aisles','Aisles & egress paths 36 in min, unobstructed'],['rt_stock','Overhead stock secured \u2014 nothing loose above head height']]}],
    security:[{name:'Vacancy',items:[['rt_vacant','Vacant suites secured, posted & documented']]}],
    traffic:[{name:'Frontage (Retail)',items:[['rt_carts','Cart corrals present & maintained'],['rt_wheelstops','Wheel stops intact \u2014 not displaced into walkways'],['rt_tenant_sign','Tenant signage secure \u2014 no loose panels']]}]
  }},
  restaurant:{name:'Restaurant / Food Service',adds:{
    safety:[{name:'Kitchen Fire Protection',items:[['rs_hood_tag','Hood suppression service tag current (6-month)'],['rs_ul300','Suppression system UL 300 listed'],['rs_kclass','Class K extinguisher within 30 ft of fryers'],['rs_hood_clean','Hood, duct & filters free of grease buildup'],['rs_fryer','Fryer clearance from open flame \u2014 16 in or baffle']]},
      {name:'Kitchen Safety',items:[['rs_mats','Slip-resistant mats at cook line & dish area'],['rs_walkin','Walk-in coolers open from inside'],['rs_rear_exit','Rear / service exit unobstructed']]}],
    compliance:[{name:'Restaurant Records',items:[['rs_grease','Grease trap service records current'],['rs_permits','Health permit & occupancy posted'],['rs_greasebin','Grease bin 10 ft from building \u00b7 lids closed']]}]
  }},
  warehouse:{name:'Warehouse / Industrial',adds:{
    safety:[{name:'Storage & Racking',items:[['wh_racking','Racking anchored, plumb & undamaged'],['wh_sprinkler_cl','18 in clearance below sprinkler heads'],['wh_flam','Flammables in listed storage cabinets'],['wh_charging','Battery / forklift charging area ventilated & clear']]}],
    traffic:[{name:'Dock & Yard',items:[['wh_docks','Dock levelers, edges & doors in good condition'],['wh_chocks','Wheel chocks / dock locks in use'],['wh_ped_lanes','Pedestrian lanes marked in forklift areas']]}]
  }},
  auto:{name:'Auto Service',adds:{
    safety:[{name:'Shop Equipment (Auto)',items:[['au_lifts','Vehicle lifts \u2014 certification current, no leaks'],['au_cylinders','Compressed gas cylinders secured upright'],['au_fluids','Waste oil & fluids stored, labeled \u00b7 no floor staining'],['au_pits','Service pits guarded when not in use']]}],
    compliance:[{name:'Auto Records',items:[['au_disposal','Hazmat / waste disposal manifests available']]}]
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
