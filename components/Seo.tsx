
import React from 'react';

// In a standard React SPA, a library like 'react-helmet-async' would be used
// to manage the document head. For this static export context, we'll create a
// component that directly appends scripts, acknowledging this is a simplified approach.

const OrganizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  'name': 'TQM Digital',
  'url': 'https://www.tqmdigital.com', // Replace with actual domain
  'logo': 'https://www.tqmdigital.com/logo.png', // Replace with actual logo URL
  'contactPoint': {
    '@type': 'ContactPoint',
    'telephone': '+1-800-555-1234',
    'contactType': 'Customer Service',
  },
  'address': {
      '@type': 'PostalAddress',
      'streetAddress': '123 Growth Lane, Suite 100',
      'addressLocality': 'Kansas City',
      'addressRegion': 'MO',
      'postalCode': '64105',
      'addressCountry': 'US'
  }
};

export const FaqSchema = (faqItems: { question: string, answer: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': faqItems.map(item => ({
    '@type': 'Question',
    'name': item.question,
    'acceptedAnswer': {
      '@type': 'Answer',
      'text': item.answer,
    },
  })),
});

export const ServiceSchema = (serviceName: string, description: string) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': serviceName,
    'description': description,
    'provider': {
        '@type': 'Organization',
        'name': 'TQM Digital'
    },
    'areaServed': {
        '@type': 'Country',
        'name': 'USA'
    }
});


type JsonLdProps = {
  schema: object;
};

const JsonLd: React.FC<JsonLdProps> = ({ schema }) => {
  const scriptId = `json-ld-${JSON.stringify(schema).length}`;

  React.useEffect(() => {
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = scriptId;
        document.head.appendChild(script);
    }
    script.innerHTML = JSON.stringify(schema);
    
    return () => {
        const existingScript = document.getElementById(scriptId);
        if (existingScript) {
            document.head.removeChild(existingScript);
        }
    }
  }, [schema, scriptId]);

  return null;
};

export const OrganizationJsonLd: React.FC = () => <JsonLd schema={OrganizationSchema} />;
export const FaqJsonLd: React.FC<{items: { question: string, answer: string }[]}> = ({items}) => <JsonLd schema={FaqSchema(items)} />;
export const ServiceJsonLd: React.FC<{name: string, description: string}> = ({name, description}) => <JsonLd schema={ServiceSchema(name, description)} />;
