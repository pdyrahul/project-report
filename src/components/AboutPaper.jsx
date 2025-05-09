"use client";
import { useEffect, useState } from "react";
import { fetchPaperDetail } from "@/services/api";
import styles from "../styles/AboutPaper.module.scss";
import { FileText,ArrowBigLeft } from "lucide-react";
import Link from "next/link";

const AboutPaper = ({ id }) => {
  const [paper, setPaper] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPaperDetail(id)
      .then(data => setPaper(data))
      .catch(err => {
        console.error(err);
        setError("Failed to fetch paper details");
      });
  }, [id]);

  if (error) return (
    <div className={styles.error}>
      {error}
      <button onClick={() => fetchPapers(id).then(data => setPaper(data || {})).catch(() => setError("Failed to fetch paper details"))}>
        Retry
      </button>
    </div>
  );

  if (!paper) return <div className={styles.loading}>Loading...</div>;

  const {
    papertitle, coauthors, publisher, publishername, journal, journalaltimpactfactor, journaldetails,
    published_at, articlelink, salevelone, saleveltwo, salevelthree, servicetype, client, assignmentno
  } = paper;

  const fields = [
    { label: "Paper Details", items: [
      { label: "Author(s)", value: coauthors || "Unknown" },
      { label: "Primary Author", value: client?.firstname && client?.lastname ? `${client.firstname} ${client.lastname}` : "N/A" },
      { label: "Organization", value: client?.organization || "N/A" },
      { label: "Publisher", value: publishername || publisher?.publishername || "N/A" },
      { label: "Published At", value: published_at && !isNaN(new Date(published_at)) ? new Date(published_at).toLocaleDateString() : "N/A" },
      { label: "Assignment Number", value: assignmentno || "N/A" },
      { label: "Service Type", value: servicetype?.servicename || "N/A" }
    ]},
    { label: "Journal Details", items: [
      { label: "Journal", value: journaldetails || journal?.title || "N/A" },
      { label: "Abbreviation", value: journal?.journalabbreviation || "N/A" },
      { label: "ISSN", value: journal?.issn || "N/A" },
      { label: "Impact Factor", value: journal?.impactfactor || journalaltimpactfactor || "N/A" },
      { label: "H-Index", value: journal?.hirschindex || "N/A" },
      { label: "Article Influence", value: journal?.articleinfluence || "N/A" },
      { label: "Crimsoni Score", value: journal?.crimsoniscore || "N/A" },
      { label: "Reach", value: journal?.journalreach || "N/A" },
      { label: "Publication Medium", value: journal?.mediumofpublication || "N/A" },
      { label: "Science Category", value: journal?.scicategory || "N/A" },
      { label: "Scopus Category", value: journal?.scopuscategory || "N/A" }
    ]},
    { label: "Subject Area", items: [
      { label: "Category", value: salevelone?.name || "N/A" },
      { label: "Subcategory", value: saleveltwo?.name || "N/A" },
      { label: "Field", value: salevelthree?.name || "N/A" }
    ]}
  ];
  return (
    <div className={styles.paperContainer}>
      <h1 className={styles.title}>{papertitle || "No Title"}</h1>
      {fields.map(({ label, items }) => (
        <div key={label}>
          <h2 className={styles.sectionTitle}>{label}</h2>
          {items.map(({ label, value }) => (
            <p key={label} className={styles.detail}>
              <strong>{label}:</strong> {value}
            </p>
          ))}
        </div>
      ))}
      {articlelink && (() => { try { new URL(articlelink); return true; } catch { return false; } })() ? (
        <Link href={articlelink} target="_blank" rel="noopener noreferrer" className={styles.link} aria-label={`View full paper: ${papertitle || "No Title"}`}>
          <FileText className={styles.icon} /> View Full Paper
        </Link>
      ) : (
        <p className={styles.detail}>Full paper link unavailable</p>
      )}
      <Link href="/"> 
      <p className={styles.detail}><ArrowBigLeft/>Back</p>
      </Link>
    </div>
  );
};

export default AboutPaper;