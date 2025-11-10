import React, { useEffect } from 'react';

interface LegalPageProps {
  page: 'Privacy' | 'Terms';
}

const LegalPage: React.FC<LegalPageProps> = ({ page }) => {
    const title = page === 'Privacy' ? 'Privacy Policy' : 'Terms of Service';

    useEffect(() => {
        document.title = `${title} | TQM Digital`;
    }, [title]);

  return (
    <div className="py-24 sm:py-32">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose prose-lg prose-invert mx-auto">
          <h1>{title}</h1>
          <p><em>Last updated: {new Date().toLocaleDateString()}</em></p>
          
          <h2>1. Introduction</h2>
          <p>
            Welcome to TQM Digital. This is a placeholder for our {title}. Please replace this content with your official legal documentation.
          </p>

          <h2>2. Information We Collect</h2>
          <p>
            Placeholder section describing data collection practices. For a real site, this would detail information collected through contact forms, analytics, and cookies.
          </p>

          <h2>3. How We Use Your Information</h2>
          <p>
            Placeholder section explaining how collected data is used. This typically covers communication, service delivery, and marketing purposes.
          </p>

          <h2>4. Your Rights</h2>
          <p>
            Placeholder section about user rights regarding their data, such as access, correction, and deletion.
          </p>
          
          <p>
            Please consult with a legal professional to create a {title} that is compliant with all applicable laws and regulations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LegalPage;