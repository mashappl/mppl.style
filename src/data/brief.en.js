/* =========================================================================
   mppl.style client brief – English version.
   Same structure and ids as brief.js (Ukrainian). Edit wording here.
   ========================================================================= */
export const BRIEF_EN = {
  title: "Client brief",
  steps: [
    /* ---------------------------------------------------------------- 1 */
    {
      id: "intro",
      title: "Getting to know you",
      kicker: "01",
      intro: "Let’s start simple: what to call you and where you live. A city’s climate and pace already say a lot about what your wardrobe needs.",
      fields: [
        { id: "name", type: "text", label: "What should I call you?", placeholder: "For example, Sofia", autocomplete: "given-name" },
        { id: "contact", type: "text", label: "How can I reach you?", hint: "Email, Telegram or Instagram – whatever suits you.", placeholder: "@sofia.k or sofia@mail.com" },
        { id: "contact_pref", type: "radio", label: "Where do you prefer to talk?", options: ["Telegram", "Instagram", "WhatsApp", "Email", "Phone call"] },
        { id: "city", type: "text", label: "City and country you live in now", placeholder: "For example, Lisbon, Portugal" },
        { id: "climate", type: "chips", label: "What’s the climate like?", hint: "Pick everything that applies.", options: ["Hot summers", "Mild winters", "Snowy winters", "Lots of rain", "Windy", "Big temperature swings during the day", "Humid", "Warm all year"] },
        { id: "relocation", type: "textarea", rows: 2, label: "Any moves or long trips planned in the coming months?", placeholder: "For example: two weeks in Barcelona in April, then moving in the summer" },
        { id: "service", type: "chips", label: "What are you interested in?", hint: "Pick a few – or “Not sure yet”, we’ll figure it out together.", options: ["Wardrobe edit", "Seasonal capsule", "Personal shopping", "Online consultation", "Colour analysis", "Looks for an event", "Not sure yet"] }
      ]
    },
    /* ---------------------------------------------------------------- 2 */
    {
      id: "goal",
      title: "Your request and goal",
      kicker: "02",
      intro: "The most important part. Write it in your own words, as it is – there are no “right” answers. This is where we’ll shape the goal of our work together.",
      fields: [
        { id: "request", type: "textarea", rows: 4, label: "What brings you to me?", placeholder: "For example: I spend ages deciding what to wear and want a few go-to formulas I feel like myself in" },
        { id: "why_now", type: "textarea", rows: 2, label: "Why now?", hint: "A new job, a move, changes in your body, or simply being fed up – it all matters.", placeholder: "For example: I changed jobs and now meet clients more often" },
        { id: "pains", type: "chips", label: "What isn’t working in your wardrobe right now?", options: ["A full closet but nothing to wear", "Pieces don’t go together", "I buy on impulse and never wear it", "I don’t know my style", "My clothes don’t fit my age / role", "I don’t know what suits me", "I don’t enjoy shopping", "I wear the same things on repeat", "My body changed and things don’t fit"], other: true },
        { id: "success", type: "textarea", rows: 3, label: "Imagine we’ve finished working together. What has changed?", placeholder: "For example: I get dressed quickly, buy less but better, and wear what I already own" },
        { id: "readiness", type: "range", label: "How ready are you for change?", min: 1, max: 10, step: 1, value: 5, left: "Small, careful steps", right: "Ready for a full reset" },
        { id: "events", type: "textarea", rows: 2, label: "Any upcoming events you need outfits for?", placeholder: "For example: my sister’s wedding in May, a work trip in October, a holiday in the mountains" },
        { id: "deadline", type: "radio", label: "When would you like to see results?", options: ["As soon as possible", "Within a month", "In 2–3 months", "No rush"] }
      ]
    },
    /* ---------------------------------------------------------------- 3 */
    {
      id: "life",
      title: "Lifestyle",
      kicker: "03",
      intro: "A good outfit is one you actually wear. So we look at your real week, not an ideal one.",
      fields: [
        { id: "occupation", type: "text", label: "What do you do?", placeholder: "For example: UX designer / teacher / run my own café / on parental leave" },
        { id: "work_format", type: "radio", label: "How do you work or study?", options: ["In the office", "Remotely", "Hybrid", "Lots of meetings and travel", "Not working / studying right now"] },
        { id: "dresscode", type: "radio", label: "Is there a dress code?", options: ["None", "Smart casual", "Business", "Strict / uniform"] },
        { id: "dresscode_note", type: "textarea", rows: 2, label: "Describe what you usually wear to work", placeholder: "For example: wide trousers, a jumper, trainers; a blazer for meetings" },
        { id: "hours", type: "hours", label: "Your week in hours", hint: "Roughly, not counting sleep. A week has about 112 waking hours – this shows where you really spend your life and what your clothes need to do.",
          rows: [
            { id: "office", label: "Work / study away from home" },
            { id: "remote", label: "Working from home" },
            { id: "home", label: "Free time at home" },
            { id: "city", label: "Out in town: errands, cafés, shopping" },
            { id: "active", label: "Sport, nature, walks" },
            { id: "events", label: "Evenings, dates, events" }
          ] },
        { id: "free_time", type: "chips", label: "How do you usually spend your free time?", options: ["Sport / yoga", "Walks", "Cafés and restaurants", "Theatre, cinema, exhibitions", "Travel", "Nature, countryside", "Parties", "Reading at home", "Time with kids", "Learning"], other: true },
        { id: "personal_days", type: "textarea", rows: 2, label: "How often do you have dinners, dates or catch-ups with friends – and what do you usually wear?", placeholder: "For example: dinner with friends twice a month – a slip dress and a trench" },
        { id: "transport", type: "chips", label: "How do you get around town?", options: ["On foot", "Own car", "Taxi", "Public transport", "Bike / scooter"] },
        { id: "care", type: "chips", label: "Anything that affects what you wear day to day?", hint: "Only pick what applies.", options: ["Small kids", "A dog I walk", "Public speaking / filming", "Physical work", "Lots of driving", "Frequent business trips"] }
      ]
    },
    /* ---------------------------------------------------------------- 4 */
    {
      id: "character",
      title: "Personality and mood",
      kicker: "04",
      intro: "Clothes are a language. Tell me who you are inside and what you’d like your look to say for you.",
      fields: [
        { id: "three_words", type: "text", label: "Describe yourself in three words", placeholder: "For example: curious, direct, a bit of a dreamer" },
        { id: "seen_as", type: "text", label: "And how would your close friends describe you?", placeholder: "For example: energetic, always full of ideas" },
        { id: "feel", type: "chips", label: "How do you want to feel in your clothes?", hint: "Pick up to 4.", max: 4, options: ["Confident", "Light", "Put-together", "Feminine", "Bold", "Calm", "Sexy", "Cosy", "Elegant", "Playful", "Strong", "Low-key"] },
        { id: "message", type: "textarea", rows: 2, label: "What should people pick up on when they first see you?", placeholder: "For example: “she’s relaxed, but everything’s under control”" }
      ]
    },
    /* ---------------------------------------------------------------- 5 */
    {
      id: "style",
      title: "Style and inspiration",
      kicker: "05",
      intro: "This is where you can dream. Show me what inspires you – even if you can’t picture it on yourself yet.",
      fields: [
        { id: "styles", type: "chips", label: "Which styles speak to you?", options: ["Minimalism", "Casual", "Sporty chic", "Classic", "Old money", "Boho", "Romantic", "French chic", "Scandinavian", "Streetwear", "Grunge", "Avant-garde", "Vintage", "Smart casual"], other: true },
        { id: "experiment", type: "range", label: "Comfort or experiment?", min: 1, max: 10, step: 1, value: 4, left: "Comfortable and familiar first", right: "I want to try new, bold things" },
        { id: "icons", type: "textarea", rows: 2, label: "Whose style do you like?", hint: "Famous people, film characters, creators or simply someone you know. One detail that catches your eye is enough.", placeholder: "For example: Phoebe Philo – clean lines; Annie Hall – menswear tailoring" },
        { id: "pinterest", type: "url", label: "Link to a Pinterest board with looks you like", placeholder: "https://pinterest.com/…" },
        { id: "instagram", type: "textarea", rows: 2, label: "Accounts, brands, films or places that inspire you", hint: "Add the account names – I’ll definitely look through them.", placeholder: "@accountname, the film “Lost in Translation”, Tokyo" }
      ]
    },
    /* ---------------------------------------------------------------- 6 */
    {
      id: "shopping",
      title: "Shopping and budget",
      kicker: "06",
      intro: "Budget isn’t about “a lot” or “a little” – it’s about making my recommendations realistic for you.",
      fields: [
        { id: "brands", type: "textarea", rows: 2, label: "Where do you usually buy clothes, shoes and bags?", placeholder: "For example: COS, Arket, & Other Stories, vintage shops, Vinted" },
        { id: "shop_where", type: "radio", label: "How do you prefer to shop?", options: ["Mostly online", "Mostly in stores", "A mix"] },
        { id: "shop_freq", type: "radio", label: "How often do you buy new things?", options: ["A few times a week", "A few times a month", "Once a month", "Once a season", "Only when something wears out"] },
        { id: "budget_month", type: "range", label: "How much are you happy to spend on clothes per month (on average)?", min: 0, max: 1000, step: 25, value: 150, unit: "€", plusAtMax: true, left: "0 €", right: "1000 € +" },
        { id: "budget_item", type: "radio", label: "A comfortable price for one basic piece (jeans, a jumper)", options: ["Under 40 €", "40–80 €", "80–150 €", "150–300 €", "300 € +"] },
        { id: "values", type: "chips", label: "What matters to you when you buy?", options: ["Quality and durability", "Price", "Local brands", "Second-hand / vintage", "Ethical production", "Made to measure", "Being on trend"] },
        { id: "wardrobe_goal", type: "range", label: "Which wardrobe feels closer to you?", min: 1, max: 10, step: 1, value: 4, left: "A compact capsule", right: "Lots of choice for every mood" },
        { id: "wardrobe_now", type: "textarea", rows: 2, label: "What’s your wardrobe like right now?", placeholder: "For example: lots of basic tees, not much outerwear; some pieces are waiting for “one day”" }
      ]
    },
    /* ---------------------------------------------------------------- 7 */
    {
      id: "body",
      title: "Body and appearance",
      kicker: "07",
      intro: "I only need this to choose cuts and sizes accurately. There are no “flaws” here, only features. You can skip any question.",
      fields: [
        { id: "love", type: "textarea", rows: 2, label: "What do you like about your appearance?", placeholder: "For example: shoulders, neck, freckles" },
        { id: "adjust", type: "textarea", rows: 2, label: "Is there anything you’d like your clothes to balance visually? What exactly?", placeholder: "For example: I’d like my legs to look longer" },
        { id: "measure", type: "group", label: "Measurements", hint: "How to measure: a soft tape, thin clothing, tape parallel to the floor. Bust – at the fullest point, waist – at the narrowest point, hips – at the widest point of the seat.",
          fields: [
            { id: "height", type: "number", label: "Height", unit: "cm", min: 120, max: 220, placeholder: "170" },
            { id: "bust", type: "number", label: "Bust", unit: "cm", min: 50, max: 200, placeholder: "90" },
            { id: "waist", type: "number", label: "Waist", unit: "cm", min: 40, max: 200, placeholder: "72" },
            { id: "hips", type: "number", label: "Hips", unit: "cm", min: 50, max: 220, placeholder: "96" }
          ] },
        { id: "feet", type: "group", label: "Shoes", hint: "To measure your foot, stand on a sheet of paper: heel to the tip of your longest toe.",
          fields: [
            { id: "shoe", type: "number", label: "Size (EU)", unit: "EU", min: 30, max: 50, step: 0.5, placeholder: "39" },
            { id: "foot", type: "number", label: "Foot length", unit: "cm", min: 18, max: 32, step: 0.1, placeholder: "25" }
          ] },
        { id: "size_top", type: "radio", label: "Top size (tees, jumpers, jackets)", options: ["XXS", "XS", "S", "M", "L", "XL", "XXL", "3XL+"] },
        { id: "size_bottom", type: "radio", label: "Bottom size (trousers, skirts)", options: ["XXS", "XS", "S", "M", "L", "XL", "XXL", "3XL+"] },
        { id: "size_note", type: "text", label: "Anything about sizing I should know?", placeholder: "For example: trousers are often too short for me" },
        { id: "hair", type: "group", label: "Hair and eyes",
          fields: [
            { id: "hair_natural", type: "text", label: "Natural hair colour", placeholder: "Chestnut" },
            { id: "hair_now", type: "text", label: "Current colour", placeholder: "Not dyed" },
            { id: "eyes", type: "text", label: "Eye colour", placeholder: "Brown" }
          ] },
        { id: "makeup", type: "chips", label: "What’s in your everyday make-up?", options: ["No make-up", "Mascara", "Brows", "Foundation / cushion", "Blush", "Lipstick / gloss", "Bold accents"] },
        { id: "glasses", type: "radio", label: "Do you wear glasses?", options: ["No", "Sometimes", "All the time"] }
      ]
    },
    /* ---------------------------------------------------------------- 8 */
    {
      id: "colors",
      title: "Colours, fabrics, fit",
      kicker: "08",
      intro: "Go with your gut – what your hand reaches for in a shop, and what you’d never pick.",
      fields: [
        { id: "colors_love", type: "swatches", label: "Colours you love and want in your wardrobe" },
        { id: "colors_no", type: "swatches", label: "Colours you don’t like or feel don’t suit you" },
        { id: "colors_why", type: "text", label: "Why do you feel that way?", placeholder: "For example: bright yellow makes my skin look grey" },
        { id: "prints_love", type: "chips", tiles: true, label: "Prints you like", options: ["No prints", "Stripes", "Check", "Houndstooth", "Polka dots", "Floral", "Animal print", "Geometric", "Abstract"] },
        { id: "prints_no", type: "chips", tiles: true, label: "Prints that are a definite no", options: ["Stripes", "Check", "Houndstooth", "Polka dots", "Floral", "Animal print", "Geometric", "Abstract", "Logos"] },
        { id: "fabrics_love", type: "chips", tiles: true, label: "Fabrics you love wearing", options: ["Cotton", "Linen", "Knit", "Cashmere", "Silk", "Wool", "Denim", "Leather", "Viscose", "Satin"], other: true },
        { id: "fabrics_no", type: "textarea", rows: 2, label: "Which fabrics don’t you like, and why?", placeholder: "For example: polyester – too hot; rough linen – creases too much" },
        { id: "leather", type: "radio", label: "Shoes and bags:", options: ["Real leather only", "Leather or a good alternative", "Vegan leather only"] },
        { id: "fit", type: "range", label: "The fit you usually go for", min: 1, max: 10, step: 1, value: 5, left: "Fitted, close to the body", right: "Loose, oversized" }
      ]
    },
    /* ---------------------------------------------------------------- 9 */
    {
      id: "details",
      title: "Wardrobe details",
      kicker: "09",
      intro: "Almost there. The specifics about lengths, shapes and accessories – the things that make a look yours.",
      fields: [
        { id: "must", type: "textarea", rows: 2, label: "Pieces you definitely want in your wardrobe", placeholder: "For example: the perfect jeans, a long cardigan, leather loafers" },
        { id: "never", type: "textarea", rows: 2, label: "Pieces you don’t wear and don’t want (and why)", placeholder: "For example: tight pencil skirts – uncomfortable to sit in" },
        { id: "heels", type: "scale", label: "How comfortable are heels for you?", min: 1, max: 5, left: "Not at all", right: "I wear them daily" },
        { id: "skirt_len", type: "chips", label: "Comfortable dress and skirt lengths", options: ["Mini", "Knee length", "Below the knee", "Midi", "Maxi", "I don’t wear dresses / skirts"] },
        { id: "trousers", type: "chips", label: "Trouser shapes you wear or want to try", options: ["Straight", "Wide / palazzo", "Flared", "Skinny", "Slouchy / tapered", "Cargo", "Tailored with a crease", "Leggings", "Shorts"] },
        { id: "trouser_len", type: "chips", label: "Trouser length", options: ["Cropped 7/8", "Classic", "Floor length", "It varies"] },
        { id: "length_note", type: "text", label: "Which lengths feel uncomfortable?", placeholder: "For example: skirts that stop mid-calf" },
        { id: "outerwear", type: "chips", label: "Outerwear you like", options: ["Long coat", "Short coat", "Trench", "Short jacket", "Leather jacket", "Puffer", "Blazer", "Parka"] },
        { id: "bags", type: "chips", label: "Bags you find comfortable", options: ["Small", "Medium", "Large / tote", "Crossbody", "Backpack", "Clutch", "Belt bag"] },
        { id: "hats", type: "chips", label: "Hats and headwear", options: ["I don’t wear them", "Cap", "Bucket hat", "Beanie", "Wide-brim hat", "Beret", "Headscarf", "I’d like to try"] },
        { id: "jewelry", type: "chips", label: "Accessories and jewellery", options: ["Earrings", "Watch", "Rings", "Chains", "Bracelets", "Belts", "Scarves", "Sunglasses as an accessory", "Minimal jewellery"] },
        { id: "metal", type: "radio", label: "Jewellery metal", options: ["Gold", "Silver", "Both", "Doesn’t matter"] }
      ]
    },
    /* ---------------------------------------------------------------- 10 */
    {
      id: "photos",
      title: "Photos",
      kicker: "10",
      intro: "Photos help me see proportions, lines and colouring that are hard to describe in words. Shoot in daylight near a window, no filters, in close-fitting plain clothes. Only I will see them.",
      fields: [
        { id: "photo_front", type: "file", label: "Full length – front", hint: "Camera at waist height, arms by your sides." },
        { id: "photo_side", type: "file", label: "Full length – side" },
        { id: "photo_face", type: "file", label: "Your face in daylight", hint: "No make-up or very little, hair pulled back from your face." },
        { id: "photo_wardrobe", type: "file", multiple: true, label: "Favourite outfits or what’s in your closet", hint: "Up to 6 photos – what you wear most." },
        { id: "photo_link", type: "url", label: "Or a link to a photo folder (Google Drive, iCloud)", placeholder: "https://drive.google.com/…" }
      ]
    },
    /* ---------------------------------------------------------------- 11 */
    {
      id: "final",
      title: "Final step",
      kicker: "11",
      intro: "Thank you for making it to the end! Just a few more lines and I’ll get started on your brief.",
      fields: [
        { id: "anything", type: "textarea", rows: 3, label: "Is there anything I should know that I didn’t ask?", placeholder: "Anything at all: worries, dreams, funny fitting-room stories" },
        { id: "consent", type: "consent", label: "I agree that my answers and photos will be used only to work on my style and won’t be shared with third parties." }
      ]
    }
  ],
  tiles: {
    "No prints": "plain.jpg", "Stripes": "stripes.jpg", "Check": "check.jpg", "Houndstooth": "houndstooth.jpg",
    "Polka dots": "dots.jpg", "Floral": "floral.jpg", "Animal print": "animal.jpg", "Geometric": "geometric.jpg",
    "Abstract": "abstract.jpg", "Logos": "logos.svg",
    "Cotton": "cotton.jpg", "Linen": "linen.jpg", "Knit": "knit.jpg", "Cashmere": "cashmere.jpg", "Silk": "silk.jpg",
    "Wool": "wool.jpg", "Denim": "denim.jpg", "Leather": "leather.jpg", "Viscose": "viscose.jpg", "Satin": "satin.jpg"
  },
  palette: [
    ["White", "#FFFFFF"], ["Milk", "#F3EBDD"], ["Beige", "#D8C3A5"], ["Camel", "#B5835A"], ["Chocolate", "#5A3A29"],
    ["Grey", "#9A9A96"], ["Graphite", "#3E3F42"], ["Black", "#111111"], ["Navy", "#1F2C4C"], ["Denim", "#5C7CA0"],
    ["Sky blue", "#A9C6E0"], ["Olive", "#6B6E3A"], ["Emerald", "#1E6B52"], ["Mint", "#BFE0CF"], ["Teal", "#2A8F8C"], ["Khaki", "#8B8558"],
    ["Mustard", "#D1A33A"], ["Yellow", "#F1D54A"], ["Terracotta", "#B85C3C"], ["Orange", "#E07B39"], ["Red", "#C3272B"],
    ["Burgundy", "#6D1F2B"], ["Powder pink", "#E8C4C0"], ["Pink", "#E58FAE"], ["Fuchsia", "#C2307A"], ["Lavender", "#B9A7D3"], ["Purple", "#5B3A7A"]
  ]
};
