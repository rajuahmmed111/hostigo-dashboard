import { useState } from "react";

export default function FAQ() {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I update my profile information?",
      answer: "Navigate to the Edit Profile section from the settings menu. You can update your personal information, contact details, and profile picture there."
    },
    {
      question: "How can I change my password?",
      answer: "Go to Edit Profile and look for the security section. You will find the option to change your password there."
    },
    {
      question: "What is the verification process?",
      answer: "The verification process involves submitting your identification documents for review. Once approved, you will have access to additional features."
    },
    {
      question: "How do I contact support?",
      answer: "You can reach our support team through the contact form on our website or email us directly at support@example.com."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we use industry-standard encryption and security measures to protect your personal and financial information."
    },
    {
      question: "How do I delete my account?",
      answer: "You can request account deletion through the settings page. Please note that this action is permanent and cannot be undone."
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept all major credit cards, debit cards, and popular digital payment methods like PayPal and Stripe."
    },
    {
      question: "How do I report an issue?",
      answer: "Use the contact form or email support@example.com with detailed information about the issue you're experiencing."
    }
  ];

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Frequently Asked Questions</h1>
          <p className="text-gray-600 text-lg">
            Find answers to common questions about our platform
          </p>
        </div>

        {/* FAQ Cards */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              <button
                onClick={() => toggleFaq(index)}
                className="w-full text-left px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors focus:outline-none focus:bg-gray-50"
              >
                <span className="text-gray-800 font-medium text-base">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                    expandedFaq === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              
              {expandedFaq === index && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Still need help?</h2>
          <p className="text-gray-600 mb-4">
            Can&apos;t find the answer you&apos;re looking for? Our support team is here to help.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}
