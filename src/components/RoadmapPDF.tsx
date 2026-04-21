import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { Roadmap } from '../types';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
    borderBottom: '2pt solid #6366f1',
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    color: '#0f172a',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: '#64748b',
    lineHeight: 1.5,
  },
  section: {
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: '#1e293b',
    marginBottom: 10,
    backgroundColor: '#f1f5f9',
    padding: 6,
    borderRadius: 4,
  },
  phaseCard: {
    marginBottom: 15,
    padding: 12,
    border: '1pt solid #e2e8f0',
    borderRadius: 8,
  },
  phaseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  phaseName: {
    fontSize: 14,
    fontWeight: 700,
    color: '#4f46e5',
  },
  phaseDuration: {
    fontSize: 10,
    color: '#94a3b8',
  },
  topicsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginBottom: 10,
  },
  topicTag: {
    fontSize: 8,
    backgroundColor: '#f8fafc',
    color: '#64748b',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
    border: '0.5pt solid #e2e8f0',
  },
  resourceItem: {
    marginBottom: 6,
    paddingLeft: 8,
    borderLeft: '1pt solid #cbd5e1',
  },
  resourceTitle: {
    fontSize: 10,
    fontWeight: 700,
    color: '#334155',
  },
  resourceDesc: {
    fontSize: 9,
    color: '#64748b',
    marginTop: 2,
  },
  projectContainer: {
    marginTop: 8,
    padding: 8,
    backgroundColor: '#eef2ff',
    borderRadius: 4,
  },
  projectTitle: {
    fontSize: 9,
    fontWeight: 700,
    color: '#4338ca',
    marginBottom: 2,
  },
  projectText: {
    fontSize: 9,
    color: '#312e81',
    fontStyle: 'italic',
  },
  sidebarSection: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
  },
  sidebarTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: '#1e293b',
    marginBottom: 6,
  },
  listItem: {
    fontSize: 9,
    color: '#475569',
    marginBottom: 4,
    flexDirection: 'row',
  },
  bullet: {
    width: 10,
    fontSize: 10,
  },
  disclaimerText: {
    fontSize: 8,
    color: '#92400e',
    fontStyle: 'italic',
  }
});

interface RoadmapPDFProps {
  roadmap: Roadmap;
}

export const RoadmapPDF = ({ roadmap }: RoadmapPDFProps) => (
  <Document title={`Learning Roadmap - ${roadmap.summary.substring(0, 30)}`}>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Learning Roadmap</Text>
        <Text style={styles.subtitle}>{roadmap.summary}</Text>
      </View>

      {/* Main Content */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Learning Journey</Text>
        {roadmap.phases.map((phase, index) => (
          <View key={index} style={styles.phaseCard} wrap={false}>
            <View style={styles.phaseHeader}>
              <Text style={styles.phaseName}>Phase {index + 1}: {phase.name}</Text>
              <Text style={styles.phaseDuration}>{phase.duration}</Text>
            </View>
            
            <View style={styles.topicsContainer}>
              {phase.topics.map((topic, i) => (
                <Text key={i} style={styles.topicTag}>{topic}</Text>
              ))}
            </View>

            <View style={{ marginBottom: 8 }}>
              <Text style={{ fontSize: 10, fontWeight: 700, color: '#64748b', marginBottom: 4 }}>Curated Resources:</Text>
              {phase.resources.map((res, i) => (
                <View key={i} style={styles.resourceItem}>
                  <Text style={styles.resourceTitle}>{res.name} ({res.type})</Text>
                  <Text style={styles.resourceDesc}>{res.description}</Text>
                </View>
              ))}
            </View>

            <View style={styles.projectContainer}>
              <Text style={styles.projectTitle}>Mastery Project:</Text>
              <Text style={styles.projectText}>"{phase.project}"</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Action Plan */}
      <View style={styles.sidebarSection} wrap={false}>
        <Text style={styles.sidebarTitle}>First Week Action Plan</Text>
        {roadmap.firstWeekActionPlan.map((step, i) => (
          <View key={i} style={styles.listItem}>
            <Text style={styles.bullet}>{i + 1}.</Text>
            <Text style={{ flex: 1 }}>{step}</Text>
          </View>
        ))}
      </View>

      {/* Progress Checkpoints */}
      <View style={[styles.sidebarSection, { backgroundColor: '#ecfdf5' }]} wrap={false}>
        <Text style={styles.sidebarTitle}>Progress Checkpoints</Text>
        {roadmap.progressCheckpoints.map((cp, i) => (
          <View key={i} style={styles.listItem}>
            <Text style={styles.bullet}>✓</Text>
            <Text style={{ flex: 1 }}>{cp}</Text>
          </View>
        ))}
      </View>

      {/* Advanced Deep Dives */}
      {roadmap.deepDives && roadmap.deepDives.length > 0 && (
        <View style={[styles.sidebarSection, { backgroundColor: '#f5f3ff' }]} wrap={false}>
          <Text style={[styles.sidebarTitle, { color: '#6d28d9' }]}>Advanced Deep Dives</Text>
          {roadmap.deepDives.map((dd, i) => (
            <View key={i} style={styles.listItem}>
              <Text style={styles.bullet}>→</Text>
              <Text style={{ flex: 1, color: '#5b21b6' }}>{dd}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Footer / Disclaimers */}
      {roadmap.disclaimers.length > 0 && (
        <View style={{ marginTop: 20, padding: 10, borderTop: '1pt solid #fef3c7' }}>
          <Text style={{ fontSize: 10, fontWeight: 700, color: '#b45309', marginBottom: 4 }}>Security & Ethics Notes:</Text>
          {roadmap.disclaimers.map((d, i) => (
            <Text key={i} style={styles.disclaimerText}>• {d}</Text>
          ))}
        </View>
      )}
    </Page>
  </Document>
);
