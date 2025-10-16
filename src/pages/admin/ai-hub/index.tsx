/**
 * AI Hub Main Page
 * ================
 * 
 * Main entry point for the Super Admin AI Hub featuring:
 * - Comprehensive dashboard overview
 * - Real-time RBAC activity monitoring  
 * - AI-powered security center integration
 * - Predictive analytics preview
 */

import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import AIHubLayout from '../../../components/layout/AIHubLayout';
import AIHubDashboard from '../../../components/admin/AIHubDashboard';

const AIHubPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>AI Hub - REJLERS Super Admin</title>
        <meta name="description" content="Comprehensive AI-powered administration center for REJLERS with advanced RBAC monitoring, security analytics, and predictive insights." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <AIHubLayout currentPage="dashboard">
        <AIHubDashboard />
      </AIHubLayout>
    </>
  );
};

export default AIHubPage;