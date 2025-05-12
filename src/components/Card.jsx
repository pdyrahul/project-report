import Image from "next/image";
import { FileText } from "lucide-react";
import styles from "../styles/Card.module.scss";
import paperpic from "../../public/placeholder.jpg";
import Link from "next/link";
const Card = ({ paper, circleBgColor }) => {
  const {
    displaytitle,
    papertitle,
    coauthors,
    publisher = {},
    journal = {},
    articlelink,
    published_at,
  } = paper || {};
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const paperTitle = displaytitle || papertitle || "No Title";
  const author = coauthors ? coauthors.split(" ")[0] : 'Unknown';
  const year = published_at ? new Date(published_at).getFullYear() : 'unknown';
  const publisherName = publisher?.publishername || "N/A";
  const impactFactor = journal?.impactfactor || "00.00";
  const journalImage = paper?.journal?.journalimage?.url 
  ? `${baseURL}${paper.journal.journalimage.url}`
  : paperpic;
  return (
    <div className={styles.card} style={{ "--circle-bg": circleBgColor }}>
      <div className={styles.figure}>
        <Image
          src={journalImage}
          alt="Journal Logo"
          width={100}
          height={100}
          className={styles.logo}
          blurDataURL={paperpic.src}
        />
        <span className={styles.impactFactor}>IF {impactFactor}</span>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>
          Paper Title: <span className={styles.subtitle}>{paperTitle}</span>
        </h3>
        <h3 className={styles.title}>
          Author: <span className={styles.subtitle}>{author}</span>
        </h3>
        
        <h3 className={styles.title}>
          Publisher: <span className={styles.subtitle}>{publisherName}</span>
        </h3>
        <h3 className={styles.title}>
          Year: <span className={styles.subtitle}>{year}</span>
        </h3>
        {articlelink && (
          <a
            href={articlelink}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.pdfLink}
          >
            <FileText /> View Link
          </a>
        )}
          <Link href={`/paper/${paper.id}`}>
           <button className={styles.viewDetails}>View Details</button>
          </Link>
      </div>
    </div>
  );
};

export default Card;
