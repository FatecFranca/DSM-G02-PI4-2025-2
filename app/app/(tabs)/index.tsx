import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AboutSection from '@/components/sections/AboutSection';
import CTASection from '@/components/sections/CTASection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import TechnologySection from '@/components/sections/TechnologySection';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <AboutSection />
        <FeaturesSection />
        <TechnologySection />
        <CTASection />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
});
