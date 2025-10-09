"use client"

import { useState } from "react";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import finixpaTheme from "../../config/finixpaTheme";

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState<string>("overview");
  const site = finixpaTheme.site;

  const sections = [
    { id: "overview", title: "Overview", icon: "📋" },
    { id: "information-collection", title: "Information We Collect", icon: "📊" },
    { id: "data-use", title: "How We Use Your Data", icon: "🔧" },
    { id: "data-sharing", title: "Data Sharing & Disclosure", icon: "🤝" },
    { id: "data-protection", title: "Data Protection & Security", icon: "🔒" },
    { id: "your-rights", title: "Your Privacy Rights", icon: "⚖️" },
    { id: "cookies", title: "Cookies & Tracking", icon: "🍪" },
    { id: "international-transfers", title: "International Data Transfers", icon: "🌍" },
    { id: "retention", title: "Data Retention", icon: "📅" },
    { id: "contact", title: "Contact Information", icon: "📞" }
  ];

  const lastUpdated = "October 2025";

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Privacy Policy Header */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl text-blue-100 mb-6">
              Your privacy and data protection are fundamental to how we operate
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span>GDPR Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                <span>UAE Data Protection Law</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                <span>ISO 27001 Standards</span>
              </div>
            </div>
            <div className="mt-4 text-sm text-blue-200">
              Last Updated: {lastUpdated}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation & Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Navigation Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Contents</h3>
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center space-x-3 ${
                        activeSection === section.id
                          ? "bg-blue-600 text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <span className="text-lg">{section.icon}</span>
                      <span className="text-sm font-medium">{section.title}</span>
                    </button>
                  ))}
                </nav>
                
                {/* Quick Contact */}
                <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">Privacy Questions?</h4>
                  <p className="text-sm text-blue-700 mb-3">Contact our Data Protection Officer</p>
                  <a 
                    href="mailto:privacy@rejlers.com" 
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    privacy@rejlers.com
                  </a>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:w-3/4">
              <div className="bg-white rounded-2xl shadow-lg">
                
                {/* Overview Section */}
                {activeSection === "overview" && (
                  <div className="p-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                      <span className="mr-3">📋</span>
                      Privacy Policy Overview
                    </h2>
                    <div className="prose prose-lg max-w-none">
                      <p className="text-gray-600 text-lg leading-relaxed mb-6">
                        REJLERS AB and its subsidiaries ("REJLERS", "we", "us", or "our") are committed to protecting your privacy and personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you visit our website, use our services, or interact with us.
                      </p>
                      
                      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
                        <h3 className="text-xl font-semibold text-blue-900 mb-3">Our Commitment</h3>
                        <p className="text-blue-800">
                          As a leading engineering consultancy operating internationally, REJLERS handles personal data with the highest standards of protection, transparency, and respect for individual privacy rights.
                        </p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-gray-50 p-6 rounded-lg">
                          <h4 className="font-semibold text-gray-800 mb-3">🏢 Data Controller</h4>
                          <p className="text-gray-600 text-sm">
                            REJLERS AB<br/>
                            Box 30233<br/>
                            SE-104 25 Stockholm, Sweden<br/>
                            Org. nr: 556349-8426
                          </p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg">
                          <h4 className="font-semibold text-gray-800 mb-3">🌍 Regional Operations</h4>
                          <p className="text-gray-600 text-sm">
                            This policy applies to all REJLERS operations including:<br/>
                            • Sweden (Headquarters)<br/>
                            • UAE (Abu Dhabi office)<br/>
                            • Norway, Finland<br/>
                            • India (Navi Mumbai)
                          </p>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-800 mb-4">Applicable Laws & Standards</h3>
                      <ul className="space-y-2 text-gray-600">
                        <li>• <strong>GDPR</strong> - General Data Protection Regulation (EU)</li>
                        <li>• <strong>UAE Data Protection Law</strong> - Federal Decree-Law No. 45 of 2021</li>
                        <li>• <strong>Swedish Data Protection Act</strong> - Dataskyddslagen (2018:218)</li>
                        <li>• <strong>ISO 27001</strong> - Information Security Management Standards</li>
                        <li>• <strong>Industry Standards</strong> - Engineering sector compliance requirements</li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* Information Collection */}
                {activeSection === "information-collection" && (
                  <div className="p-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                      <span className="mr-3">📊</span>
                      Information We Collect
                    </h2>
                    
                    <div className="space-y-8">
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                        <h3 className="text-xl font-semibold text-blue-900 mb-4">Personal Information Categories</h3>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-blue-800 mb-3">👤 Contact Information</h4>
                            <ul className="text-blue-700 text-sm space-y-1">
                              <li>• Full name and professional title</li>
                              <li>• Business email address</li>
                              <li>• Phone numbers (business/mobile)</li>
                              <li>• Company name and address</li>
                              <li>• Professional role and department</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-blue-800 mb-3">🏢 Business Information</h4>
                            <ul className="text-blue-700 text-sm space-y-1">
                              <li>• Project requirements and specifications</li>
                              <li>• Industry sector and company size</li>
                              <li>• Technical preferences and standards</li>
                              <li>• Budget ranges and timelines</li>
                              <li>• Communication preferences</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">How We Collect Information</h3>
                        
                        <div className="grid gap-6">
                          <div className="border border-gray-200 rounded-lg p-6">
                            <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                              <span className="mr-2">📝</span>
                              Direct Collection
                            </h4>
                            <p className="text-gray-600 text-sm mb-3">
                              Information you provide directly when:
                            </p>
                            <ul className="text-gray-600 text-sm space-y-1 ml-4">
                              <li>• Submitting contact forms or project inquiries</li>
                              <li>• Requesting consultations or quotes</li>
                              <li>• Subscribing to newsletters or updates</li>
                              <li>• Participating in webinars or events</li>
                              <li>• Creating accounts or user profiles</li>
                            </ul>
                          </div>

                          <div className="border border-gray-200 rounded-lg p-6">
                            <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                              <span className="mr-2">🔍</span>
                              Automatic Collection
                            </h4>
                            <p className="text-gray-600 text-sm mb-3">
                              Technical information collected automatically:
                            </p>
                            <ul className="text-gray-600 text-sm space-y-1 ml-4">
                              <li>• IP address and geographic location</li>
                              <li>• Browser type, version, and settings</li>
                              <li>• Device information and screen resolution</li>
                              <li>• Website usage patterns and page views</li>
                              <li>• Referral sources and search terms</li>
                            </ul>
                          </div>

                          <div className="border border-gray-200 rounded-lg p-6">
                            <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                              <span className="mr-2">🤝</span>
                              Third-Party Sources
                            </h4>
                            <p className="text-gray-600 text-sm mb-3">
                              Information from legitimate business sources:
                            </p>
                            <ul className="text-gray-600 text-sm space-y-1 ml-4">
                              <li>• Professional networking platforms (LinkedIn)</li>
                              <li>• Industry directories and databases</li>
                              <li>• Business partners and referrals</li>
                              <li>• Public company information</li>
                              <li>• Conference and event registrations</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Data Use */}
                {activeSection === "data-use" && (
                  <div className="p-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                      <span className="mr-3">🔧</span>
                      How We Use Your Data
                    </h2>
                    
                    <div className="space-y-8">
                      <div className="bg-green-50 border-l-4 border-green-500 p-6">
                        <h3 className="text-xl font-semibold text-green-900 mb-3">Legal Basis for Processing</h3>
                        <p className="text-green-800">
                          We process personal data only when we have a valid legal basis under GDPR and applicable data protection laws. Our primary legal bases include legitimate business interests, contractual necessity, consent, and legal obligations.
                        </p>
                      </div>

                      <div className="grid gap-6">
                        <div className="border border-gray-200 rounded-lg p-6">
                          <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                            <span className="mr-2">🎯</span>
                            Primary Business Purposes
                          </h4>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <h5 className="font-medium text-gray-700 mb-2">Service Delivery</h5>
                              <ul className="text-gray-600 text-sm space-y-1">
                                <li>• Responding to project inquiries</li>
                                <li>• Providing engineering consultations</li>
                                <li>• Delivering technical services</li>
                                <li>• Managing client relationships</li>
                              </ul>
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-700 mb-2">Communication</h5>
                              <ul className="text-gray-600 text-sm space-y-1">
                                <li>• Sending service-related updates</li>
                                <li>• Technical support and assistance</li>
                                <li>• Industry news and insights</li>
                                <li>• Event invitations and webinars</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="border border-gray-200 rounded-lg p-6">
                          <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                            <span className="mr-2">📈</span>
                            Business Operations
                          </h4>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <h5 className="font-medium text-gray-700 mb-2">Analytics & Improvement</h5>
                              <ul className="text-gray-600 text-sm space-y-1">
                                <li>• Website usage analysis</li>
                                <li>• Service quality enhancement</li>
                                <li>• Market research and trends</li>
                                <li>• Performance optimization</li>
                              </ul>
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-700 mb-2">Legal & Compliance</h5>
                              <ul className="text-gray-600 text-sm space-y-1">
                                <li>• Regulatory compliance requirements</li>
                                <li>• Contract management and fulfillment</li>
                                <li>• Legal claims and dispute resolution</li>
                                <li>• Audit and record-keeping obligations</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="border border-gray-200 rounded-lg p-6">
                          <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                            <span className="mr-2">🚫</span>
                            What We Don't Do
                          </h4>
                          <div className="bg-red-50 p-4 rounded-lg">
                            <ul className="text-red-800 text-sm space-y-2">
                              <li>• <strong>No selling of personal data</strong> - We never sell your information to third parties</li>
                              <li>• <strong>No unrelated marketing</strong> - We only send relevant, industry-related communications</li>
                              <li>• <strong>No automated decision-making</strong> - Important decisions involve human review</li>
                              <li>• <strong>No data mining</strong> - We don't use your data for unrelated commercial purposes</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Continue with other sections... */}
                {activeSection === "data-protection" && (
                  <div className="p-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                      <span className="mr-3">🔒</span>
                      Data Protection & Security
                    </h2>
                    
                    <div className="space-y-8">
                      <div className="bg-blue-50 border-l-4 border-blue-500 p-6">
                        <h3 className="text-xl font-semibold text-blue-900 mb-3">Security Commitment</h3>
                        <p className="text-blue-800">
                          As an engineering consultancy handling sensitive project data, REJLERS implements comprehensive security measures aligned with ISO 27001 standards and industry best practices.
                        </p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="border border-gray-200 rounded-lg p-6">
                          <h4 className="font-semibold text-gray-800 mb-4">🔐 Technical Safeguards</h4>
                          <ul className="text-gray-600 text-sm space-y-2">
                            <li>• End-to-end encryption for data transmission</li>
                            <li>• Secure cloud infrastructure (ISO 27001 certified)</li>
                            <li>• Multi-factor authentication systems</li>
                            <li>• Regular security assessments and penetration testing</li>
                            <li>• Automated backup and disaster recovery systems</li>
                          </ul>
                        </div>
                        
                        <div className="border border-gray-200 rounded-lg p-6">
                          <h4 className="font-semibold text-gray-800 mb-4">👥 Organizational Measures</h4>
                          <ul className="text-gray-600 text-sm space-y-2">
                            <li>• Staff data protection training and certification</li>
                            <li>• Strict access controls and role-based permissions</li>
                            <li>• Confidentiality agreements for all personnel</li>
                            <li>• Regular compliance audits and monitoring</li>
                            <li>• Incident response and breach notification procedures</li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                        <h4 className="font-semibold text-yellow-900 mb-3">🚨 Breach Notification</h4>
                        <p className="text-yellow-800 text-sm">
                          In the unlikely event of a personal data breach that poses a risk to your rights and freedoms, we will notify you and relevant supervisory authorities within 72 hours as required by GDPR, along with details of the incident and remedial actions taken.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Your Rights Section */}
                {activeSection === "your-rights" && (
                  <div className="p-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                      <span className="mr-3">⚖️</span>
                      Your Privacy Rights
                    </h2>
                    
                    <div className="space-y-6">
                      <div className="bg-green-50 border-l-4 border-green-500 p-6">
                        <h3 className="text-xl font-semibold text-green-900 mb-3">Your Rights Under GDPR</h3>
                        <p className="text-green-800">
                          You have comprehensive rights regarding your personal data. We are committed to facilitating the exercise of these rights in a timely and transparent manner.
                        </p>
                      </div>

                      <div className="grid gap-4">
                        {[
                          {
                            right: "Right of Access",
                            icon: "👁️",
                            description: "Request copies of your personal data and information about how we process it"
                          },
                          {
                            right: "Right to Rectification",
                            icon: "✏️", 
                            description: "Request correction of inaccurate or incomplete personal data"
                          },
                          {
                            right: "Right to Erasure",
                            icon: "🗑️",
                            description: "Request deletion of your personal data under certain circumstances"
                          },
                          {
                            right: "Right to Restrict Processing",
                            icon: "⏸️",
                            description: "Request limitation of how we process your personal data"
                          },
                          {
                            right: "Right to Data Portability",
                            icon: "📤",
                            description: "Request your data in a structured, machine-readable format"
                          },
                          {
                            right: "Right to Object",
                            icon: "🚫",
                            description: "Object to processing based on legitimate interests or direct marketing"
                          }
                        ].map((item, index) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                            <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                              <span className="mr-3 text-xl">{item.icon}</span>
                              {item.right}
                            </h4>
                            <p className="text-gray-600 text-sm">{item.description}</p>
                          </div>
                        ))}
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <h4 className="font-semibold text-blue-900 mb-3">How to Exercise Your Rights</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h5 className="font-medium text-blue-800 mb-2">Contact Methods</h5>
                            <ul className="text-blue-700 text-sm space-y-1">
                              <li>• Email: privacy@rejlers.com</li>
                              <li>• Phone: +46 771 78 00 00</li>
                              <li>• Mail: REJLERS AB, Box 30233, SE-104 25 Stockholm</li>
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-medium text-blue-800 mb-2">Response Timeline</h5>
                            <ul className="text-blue-700 text-sm space-y-1">
                              <li>• Initial response: Within 5 business days</li>
                              <li>• Full response: Within 30 days (GDPR requirement)</li>
                              <li>• Complex requests: Up to 60 days with notification</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Contact Section */}
                {activeSection === "contact" && (
                  <div className="p-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                      <span className="mr-3">📞</span>
                      Contact Information
                    </h2>
                    
                    <div className="space-y-8">
                      <div className="bg-blue-50 border-l-4 border-blue-500 p-6">
                        <h3 className="text-xl font-semibold text-blue-900 mb-3">Data Protection Officer</h3>
                        <p className="text-blue-800 mb-4">
                          For all privacy-related questions, data protection concerns, or to exercise your rights, please contact our Data Protection Officer:
                        </p>
                        <div className="bg-white p-4 rounded-lg">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold text-gray-800 mb-2">Contact Details</h4>
                              <p className="text-gray-600 text-sm mb-1">Email: <a href="mailto:privacy@rejlers.com" className="text-blue-600 hover:underline">privacy@rejlers.com</a></p>
                              <p className="text-gray-600 text-sm mb-1">Phone: +46 771 78 00 00</p>
                              <p className="text-gray-600 text-sm">Response time: Within 5 business days</p>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-800 mb-2">Postal Address</h4>
                              <p className="text-gray-600 text-sm">
                                REJLERS AB<br/>
                                Data Protection Officer<br/>
                                Box 30233<br/>
                                SE-104 25 Stockholm, Sweden
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="border border-gray-200 rounded-lg p-6">
                          <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                            <span className="mr-2">🏢</span>
                            Regional Offices
                          </h4>
                          <div className="space-y-4">
                            <div>
                              <h5 className="font-medium text-gray-700">UAE Office</h5>
                              <p className="text-gray-600 text-sm">
                                REJLERS Middle East<br/>
                                Abu Dhabi, UAE<br/>
                                Phone: +971 2 639 7449
                              </p>
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-700">India Office</h5>
                              <p className="text-gray-600 text-sm">
                                REJLERS India<br/>
                                Navi Mumbai, India<br/>
                                Phone: Available on request
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border border-gray-200 rounded-lg p-6">
                          <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                            <span className="mr-2">⚖️</span>
                            Supervisory Authorities
                          </h4>
                          <div className="space-y-4">
                            <div>
                              <h5 className="font-medium text-gray-700">Sweden (Lead Authority)</h5>
                              <p className="text-gray-600 text-sm">
                                Swedish Authority for Privacy Protection<br/>
                                Website: imy.se<br/>
                                Email: imy@imy.se
                              </p>
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-700">UAE</h5>
                              <p className="text-gray-600 text-sm">
                                UAE Data Office<br/>
                                Website: data.gov.ae<br/>
                                Email: info@tdra.gov.ae
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-6 rounded-lg">
                        <h4 className="font-semibold text-gray-800 mb-3">Policy Updates</h4>
                        <p className="text-gray-600 text-sm mb-3">
                          We may update this Privacy Policy periodically to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of significant changes by:
                        </p>
                        <ul className="text-gray-600 text-sm space-y-1 ml-4">
                          <li>• Email notification to registered users</li>
                          <li>• Prominent notice on our website</li>
                          <li>• Updated "Last Modified" date at the top of this policy</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    {/* Footer with Working Links */}
    <Footer />
    </>
  );
}