/**
 * AI Security Center Page
 * =======================
 * 
 * Dedicated page for the AI Security Center featuring:
 * - Real-time security monitoring and threat detection
 * - RBAC activity visualization and analysis
 * - AI-powered anomaly detection and alerts
 * - Security incident management
 */

import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import AIHubLayout from '../../../components/layout/AIHubLayout';
import AISecurityCenter from '../../../components/admin/AISecurityCenter';

const AISecurityCenterPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>AI Security Center - REJLERS AI Hub</title>
        <meta name="description" content="Advanced AI-powered security monitoring and threat detection center for comprehensive RBAC and system security analysis." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <AIHubLayout currentPage="security-center">
        <AISecurityCenter />
      </AIHubLayout>
    </>
  );
};

export default AISecurityCenterPage;