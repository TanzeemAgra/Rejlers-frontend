/**
 * Predictive Analytics Page
 * =========================
 * 
 * Dedicated page for AI-powered predictive analytics featuring:
 * - Machine learning predictions for security metrics
 * - Access pattern forecasting and behavioral analysis
 * - Risk assessment and trend analysis
 * - Performance optimization recommendations
 */

import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import AIHubLayout from '../../../components/layout/AIHubLayout';
import PredictiveAnalyticsDashboard from '../../../components/admin/PredictiveAnalyticsDashboard';

const PredictiveAnalyticsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Predictive Analytics - REJLERS AI Hub</title>
        <meta name="description" content="Advanced AI-powered predictive analytics for security forecasting, behavioral analysis, and system optimization insights." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <AIHubLayout currentPage="analytics">
        <PredictiveAnalyticsDashboard />
      </AIHubLayout>
    </>
  );
};

export default PredictiveAnalyticsPage;