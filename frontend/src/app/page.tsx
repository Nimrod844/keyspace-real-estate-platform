"use client";

import { useEffect, useMemo, useState } from "react";
type PropertyImage = {
  id: number;
  image: string;
  alt_text: string;
  is_cover: boolean;
  sort_order: number;
};
type Property = {
  id: number;
  title: string;
  description: string;
  listing_type: "rent" | "sale" | "commercial" | "land";
  property_type: string;
  location: string;
  price_kes: number;
  bedrooms: number;
  bathrooms: number;
  advertiser_name: string;
  review_status: string;
  created_at: string;
  images: PropertyImage[];
};

const API_URL = "http://127.0.0.1:8000/api/properties/";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80";

const categories = ["Rent", "Buy", "Commercial", "Land"] as const;

type Category = (typeof categories)[number];

function getCategory(type: Property["listing_type"]): Category {
  switch (type) {
    case "rent":
      return "Rent";
    case "sale":
      return "Buy";
    case "commercial":
      return "Commercial";
    case "land":
      return "Land";
  }
}

function formatPrice(property: Property) {
  const price =
    property.price_kes >= 1_000_000 &&
    property.listing_type !== "rent"
      ? `KSh ${(property.price_kes / 1_000_000).toFixed(1)}M`
      : `KSh ${property.price_kes.toLocaleString("en-KE")}`;

  return property.listing_type === "rent"
    ? `${price} / month`
    : price;
}

function getBadge(type: Property["listing_type"]) {
  switch (type) {
    case "rent":
      return "FOR RENT";
    case "sale":
      return "FOR SALE";
    case "commercial":
      return "COMMERCIAL";
    case "land":
      return "LAND";
  }
}

export default function HomePage() {
  const [homes, setHomes] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [kind, setKind] = useState<Category>("Rent");
  const [where, setWhere] = useState("");
  const [budget, setBudget] = useState("");
  const [saved, setSaved] = useState<number[]>([]);

  // Fetch approved properties from Django
  useEffect(() => {
    const controller = new AbortController();

    async function loadProperties() {
      try {
        const response = await fetch(API_URL, {
          cache: "no-store",
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Unable to retrieve properties.");
        }

        const data: Property[] = await response.json();

        setHomes(data);
        setError("");
      } catch (err) {
        if (controller.signal.aborted) return;

        console.error("KEYSPACE API error:", err);

        setError(
          "Unable to load properties. Please check that the KEYSPACE backend is running."
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadProperties();

    return () => controller.abort();
  }, []);

  // Filter database properties
  const results = useMemo(() => {
    return homes.filter((property) => {
      const matchesCategory = getCategory(property.listing_type) === kind;

      const matchesLocation = property.location
        .toLowerCase()
        .includes(where.toLowerCase());

      const matchesBudget =
        !budget || property.price_kes <= Number(budget);

      return matchesCategory && matchesLocation && matchesBudget;
    });
  }, [homes, kind, where, budget]);

  function toggleSaved(id: number) {
    setSaved((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  return (
    <>
      <header className="nav">
        <a className="brand" href="#">
          <span>⌂</span> KEYSPACE
        </a>

        <div>
          <a href="#homes">Find a home</a>
          <a href="#trust">Trust & safety</a>
          <a href="#how">How it works</a>
        </div>

        <a className="cta" href="#list">
          List a property
        </a>
      </header>

      <main>
        <section className="hero">
          <div className="heroText">
            <small>A SMARTER WAY TO FIND YOUR SPACE</small>

            <h1>
              Your next chapter
              <br />
              starts <em>at home.</em>
            </h1>

            <p>
              Discover homes, compare your options and connect
              with property professionals — with trust built into
              the experience.
            </p>

            <div className="search">
              <div className="tabs">
                {categories.map((category) => (
                  <button
                    className={kind === category ? "selected" : ""}
                    onClick={() => setKind(category)}
                    key={category}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="fields">
                <label>
                  Location
                  <input
                    value={where}
                    onChange={(e) => setWhere(e.target.value)}
                    placeholder="Nairobi, Kiambu..."
                  />
                </label>

                <label>
                  Maximum budget (KES)
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                  >
                    <option value="">Any budget</option>
                    <option value="25000">25,000</option>
                    <option value="50000">50,000</option>
                    <option value="100000">100,000</option>
                    <option value="20000000">20,000,000</option>
                  </select>
                </label>

                <a className="cta" href="#homes">
                  Search homes →
                </a>
              </div>
            </div>
          </div>
        </section>

        <div className="trustline">
          <span>✓ Clear listing information</span>
          <span>⌖ Location-first discovery</span>
          <span>✦ Verification before publication</span>
        </div>

        <section className="section" id="homes">
          <div className="sectionTitle">
            <div>
              <small>DISCOVER YOUR NEXT MOVE</small>
              <h2>Featured properties</h2>

              <p>
                Discover properties published on KEYSPACE.
              </p>
            </div>

            <span>{results.length} properties</span>
          </div>

          {loading && <p>Loading KEYSPACE properties...</p>}

          {error && (
            <p className="warning" role="alert">
              {error}
            </p>
          )}

          {!loading && !error && (
            <div className="cards">
              {results.map((property) => (
                <article className="card" key={property.id}>
                  <div className="photo">
                    <img
  src={
    property.images?.find((image) => image.is_cover)?.image ||
    property.images?.[0]?.image ||
    FALLBACK_IMAGE
  }
  alt={
    property.images?.find((image) => image.is_cover)?.alt_text ||
    property.title
  }
/>
                    <button
                      aria-label="Save property"
                      onClick={() => toggleSaved(property.id)}
                    >
                      {saved.includes(property.id) ? "♥" : "♡"}
                    </button>

                    <b>{getBadge(property.listing_type)}</b>
                  </div>

                  <div className="cardBody">
                    <strong>{formatPrice(property)}</strong>

                    <h3>{property.title}</h3>

                    <p>⌖ {property.location}</p>

                    <small>
                      {property.bedrooms} beds ·{" "}
                      {property.bathrooms} baths ·{" "}
                      {property.property_type}
                    </small>

                    <div className="warning">
                      Listing status: {property.review_status}
                    </div>
                  </div>
                </article>
              ))}

              {results.length === 0 && (
                <p>
                  No properties found for this category.
                  Try changing your search filters.
                </p>
              )}
            </div>
          )}
        </section>

        <section className="trust" id="trust">
          <div>
            <small>KEYSPACE TRUST FRAMEWORK</small>

            <h2>Listings need more than a profile.</h2>

            <p>
              Advertisers must establish their identity and
              demonstrate ownership or permission to represent
              a property. Listings remain unpublished until
              required checks and human review are complete.
            </p>
          </div>

          <div className="steps">
            <p>
              <b>01</b>
              <span>
                <strong>Identity check</strong>
                <br />
                Confirm who is advertising.
              </span>
            </p>

            <p>
              <b>02</b>
              <span>
                <strong>Ownership or authority</strong>
                <br />
                Review evidence or owner authorisation.
              </span>
            </p>

            <p>
              <b>03</b>
              <span>
                <strong>Property review</strong>
                <br />
                Check details, location and availability.
              </span>
            </p>

            <p>
              <b>04</b>
              <span>
                <strong>Human approval</strong>
                <br />
                Approve, reject or request more evidence.
              </span>
            </p>
          </div>
        </section>

        <section className="section split" id="how">
          <div>
            <small>BUILT FOR THE WHOLE PROPERTY JOURNEY</small>

            <h2>
              One marketplace.
              <br />
              Many ways to find your space.
            </h2>

            <p>
              For tenants, buyers, property owners,
              authorised agents and developers.
            </p>
          </div>

          <div>
            <p>
              01 &nbsp; <b>Rent or buy</b>
              <br />
              Search, shortlist and compare properties.
            </p>

            <p>
              02 &nbsp; <b>Owners and agents</b>
              <br />
              Submit properties with evidence of authority.
            </p>

            <p>
              03 &nbsp; <b>Developers</b>
              <br />
              Showcase projects and available units.
            </p>
          </div>
        </section>

        <section className="banner" id="list">
          <div>
            <small>FOR PROPERTY PROFESSIONALS</small>

            <h2>Have a property to list?</h2>

            <p>
              Advertiser onboarding and listing submission
              will be added in the next milestone.
            </p>
          </div>

          <button
            onClick={() =>
              alert("Advertiser onboarding is planned for the next milestone.")
            }
          >
            Coming soon →
          </button>
        </section>
      </main>

      <footer>
        <b>⌂ KEYSPACE</b>
        <span>Find Your Space. Own Your Future.</span>
        <small>KEYSPACE development build</small>
      </footer>
    </>
  );
}
