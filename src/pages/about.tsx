// src/pages/about.tsx

const AboutPage = () => {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold mb-4">About DealFinder</h1>
        <p className="text-lg mb-4">
          DealFinder is a powerful web application designed to simplify complex Terms and Conditions, 
          making it easy for users to understand the details, risks, and implications of various deals, 
          promotions, and subscriptions. With DealFinder, you get clear summaries, in-depth analyses, and 
          straightforward recommendations on whether you should proceed with an agreement or not.
        </p>
        
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
          <p>
            We believe in transparency and empowering users with information. Our mission is to break down 
            complex legal jargon, helping users make informed decisions without the hassle of deciphering 
            lengthy documents. We aim to bridge the gap between businesses and consumers by promoting 
            clarity and trust.
          </p>
        </section>
  
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Key Features</h2>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Summarize:</strong> Get a quick, user-friendly summary of Terms and Conditions.</li>
            <li><strong>Analyze:</strong> Discover potential risks, hidden fees, and other concerns.</li>
            <li><strong>Trust Assessment:</strong> Receive a clear recommendation on whether its good to go or bad to proceed.</li>
          </ul>
        </section>
  
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Why Choose DealFinder?</h2>
          <p>
            In todays world, businesses often present complex agreements. DealFinder is here to simplify this 
            experience by providing a tool that ensures transparency, safeguards user rights, and promotes 
            informed decisions. Whether you are signing up for a subscription, making a major purchase, 
            or agreeing to new terms, DealFinder has you covered.
          </p>
        </section>
      </div>
    );
  };
  
  export default AboutPage;
  