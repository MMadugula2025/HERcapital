import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView,
  Modal, TextInput,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '../theme';

const INITIAL_POSTS = [
  {
    initials: 'JT', name: 'Jordan T.', tag: 'Sophomore · Finance',
    body: 'Switched my grocery spend to my 4%-back card and it covered my textbooks this semester without touching savings.',
    kind: 'win',
  },
  {
    initials: 'RP', name: 'Riya P.', tag: 'Freshman · Bio',
    body: "Learned the hard way that a store card's 20% discount isn't worth it once the deferred interest kicks in. Read the terms first.",
    kind: 'lesson',
  },
  {
    initials: 'SM', name: 'Sam M.', tag: 'Junior · Comm',
    body: 'Set autopay for the statement balance, not the minimum — it\u2019s the easiest way to stop interest before it starts.',
    kind: 'tip',
  },
];

const KIND_STYLES = {
  win: { bg: '#e2ede6', color: colors.brandDark, label: 'win' },
  lesson: { bg: colors.warnSoft, color: colors.warn, label: 'lesson' },
  tip: { bg: colors.goldSoft, color: '#7a521c', label: 'tip' },
  opportunity: { bg: '#dce7f2', color: '#2c5580', label: 'opportunity' },
  question: { bg: '#e8def0', color: '#6b3fa0', label: 'question' },
};

const GRADE_OPTIONS = ['Freshman', 'Sophomore', 'Junior', 'Senior'];
const TAG_OPTIONS = ['win', 'lesson', 'tip', 'question', 'opportunity'];

const INITIAL_GROUPS = [
  { name: 'Scholarship Alerts', sub: '2.3k members · new posts daily', joined: true },
  { name: 'Side Hustle Swap', sub: '890 members', joined: false },
  { name: 'Internship Leads', sub: '1.6k members', joined: false },
];

function getInitials(name) {
  if (!name || !name.trim()) return 'A';
  const parts = name.trim().split(' ');
  return parts.length === 1
    ? parts[0][0].toUpperCase()
    : (parts[0][0] + parts[1][0]).toUpperCase();
}

export default function CommunityScreen() {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [groups, setGroups] = useState(INITIAL_GROUPS);
  const [modalVisible, setModalVisible] = useState(false);

  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');
  const [major, setMajor] = useState('');
  const [body, setBody] = useState('');
  const [tag, setTag] = useState('');
  const [errors, setErrors] = useState({});

  function toggleJoin(index) {
    setGroups((prev) =>
      prev.map((g, i) => (i === index ? { ...g, joined: !g.joined } : g))
    );
  }

  function resetForm() {
    setName(''); setGrade(''); setMajor(''); setBody(''); setTag(''); setErrors({});
  }

  function openModal() {
    resetForm();
    setModalVisible(true);
  }

  function handleSubmit() {
    const newErrors = {};
    if (!body.trim()) newErrors.body = 'Post content is required.';
    if (!tag) newErrors.tag = 'Please select a tag.';
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const displayName = name.trim() || 'Anonymous';
    const metaParts = [grade, major.trim()].filter(Boolean);

    const newPost = {
      initials: name.trim() ? getInitials(name) : 'A',
      name: displayName,
      tag: metaParts.join(' · '),
      body: body.trim(),
      kind: tag,
    };

    setPosts([newPost, ...posts]);
    setModalVisible(false);
    resetForm();
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.title}>Community</Text>
            <Text style={styles.subtitle}>Wins, mistakes, and leads from students like you</Text>
          </View>
          <TouchableOpacity style={styles.addButton} onPress={openModal}>
            <Ionicons name="add" size={22} color={colors.brandDark} />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>FEED</Text>
        {posts.map((p, i) => {
          const k = KIND_STYLES[p.kind];
          return (
            <View key={i} style={styles.postCard}>
              <View style={styles.postHead}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{p.initials}</Text>
                </View>
                <View>
                  <Text style={styles.postName}>{p.name}</Text>
                  {!!p.tag && <Text style={styles.postTag}>{p.tag}</Text>}
                </View>
              </View>
              <Text style={styles.postBody}>{p.body}</Text>
              <View style={[styles.pill, { backgroundColor: k.bg }]}>
                <Text style={[styles.pillText, { color: k.color }]}>{k.label}</Text>
              </View>
            </View>
          );
        })}

        <Text style={styles.sectionTitle}>GROUPS</Text>
        {groups.map((g, i) => (
          <View key={g.name} style={styles.groupRow}>
            <View>
              <Text style={styles.groupName}>{g.name}</Text>
              <Text style={styles.groupSub}>{g.sub}</Text>
            </View>
            <TouchableOpacity
              style={[styles.joinBtn, g.joined && styles.joinBtnActive]}
              onPress={() => toggleJoin(i)}
            >
              <Text style={[styles.joinBtnText, g.joined && styles.joinBtnTextActive]}>
                {g.joined ? 'Joined' : 'Join'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.modalHeaderRow}>
                <Text style={styles.modalTitle}>New Post</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Ionicons name="close" size={22} color={colors.ink} />
                </TouchableOpacity>
              </View>

              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Leave blank to post anonymously"
                placeholderTextColor={colors.inkSoft}
                value={name}
                onChangeText={setName}
              />

              <Text style={styles.label}>Grade Level</Text>
              <View style={styles.pickerWrapper}>
                <Picker selectedValue={grade} onValueChange={setGrade}>
                  <Picker.Item label="Select grade (optional)" value="" />
                  {GRADE_OPTIONS.map((g) => (
                    <Picker.Item key={g} label={g} value={g} />
                  ))}
                </Picker>
              </View>

              <Text style={styles.label}>Major</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Finance, Bio, Comm"
                placeholderTextColor={colors.inkSoft}
                value={major}
                onChangeText={setMajor}
              />

              <Text style={styles.label}>
                Post Content <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={[styles.input, styles.textArea, errors.body && styles.inputError]}
                placeholder="Share a win, lesson, tip, question, or opportunity..."
                placeholderTextColor={colors.inkSoft}
                value={body}
                onChangeText={(t) => {
                  setBody(t);
                  if (errors.body) setErrors((e) => ({ ...e, body: null }));
                }}
                multiline
                numberOfLines={5}
                textAlignVertical="top"
              />
              {errors.body && <Text style={styles.errorText}>{errors.body}</Text>}

              <Text style={styles.label}>
                Tag <Text style={styles.required}>*</Text>
              </Text>
              <View style={[styles.pickerWrapper, errors.tag && styles.inputError]}>
                <Picker
                  selectedValue={tag}
                  onValueChange={(val) => {
                    setTag(val);
                    if (errors.tag) setErrors((e) => ({ ...e, tag: null }));
                  }}
                >
                  <Picker.Item label="Select a tag" value="" />
                  {TAG_OPTIONS.map((t) => (
                    <Picker.Item key={t} label={t} value={t} />
                  ))}
                </Picker>
              </View>
              {errors.tag && <Text style={styles.errorText}>{errors.tag}</Text>}

              <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitText}>Post</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  container: { padding: spacing.lg, paddingBottom: 40 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  title: { fontSize: 22, fontWeight: '600', color: colors.ink },
  subtitle: { fontSize: 12, color: colors.inkSoft, marginTop: 2, maxWidth: 240 },
  addButton: {
    width: 34, height: 34, borderRadius: 17, backgroundColor: colors.card,
    borderWidth: 1, borderColor: colors.line,
    alignItems: 'center', justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 11, fontWeight: '700', letterSpacing: 1, color: colors.inkSoft,
    marginTop: 22, marginBottom: 10,
  },
  postCard: {
    backgroundColor: colors.card, borderWidth: 1, borderColor: colors.line,
    borderRadius: 16, padding: 14, marginBottom: 10,
  },
  postHead: { flexDirection: 'row', alignItems: 'center', gap: 9, marginBottom: 8 },
  avatar: {
    width: 28, height: 28, borderRadius: 14, backgroundColor: colors.brand,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  postName: { fontSize: 12.5, fontWeight: '700', color: colors.ink },
  postTag: { fontSize: 10, color: colors.inkSoft },
  postBody: { fontSize: 12.5, lineHeight: 18, color: colors.ink },
  pill: {
    alignSelf: 'flex-start', borderRadius: 20, paddingVertical: 3, paddingHorizontal: 8,
    marginTop: 8,
  },
  pillText: { fontSize: 9.5, fontWeight: '700' },

  groupRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: colors.card, borderWidth: 1, borderColor: colors.line,
    borderRadius: 14, padding: 14, marginBottom: 8,
  },
  groupName: { fontSize: 13, fontWeight: '700', color: colors.ink },
  groupSub: { fontSize: 11, color: colors.inkSoft },
  joinBtn: {
    borderWidth: 1.5, borderColor: colors.brand, borderRadius: 20,
    paddingVertical: 6, paddingHorizontal: 12,
  },
  joinBtnActive: { backgroundColor: colors.brand },
  joinBtnText: { fontSize: 11, fontWeight: '700', color: colors.brand },
  joinBtnTextActive: { color: '#fff' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  modalContent: {
    backgroundColor: colors.bg, borderTopLeftRadius: 22, borderTopRightRadius: 22,
    padding: 20, maxHeight: '85%',
  },
  modalHeaderRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14,
  },
  modalTitle: { fontSize: 18, fontWeight: '700', color: colors.ink },
  label: { fontSize: 13, fontWeight: '600', color: colors.ink, marginTop: 14, marginBottom: 6 },
  required: { color: '#c0392b' },
  input: {
    borderWidth: 1, borderColor: colors.line, borderRadius: 10,
    padding: 12, fontSize: 14, color: colors.ink, backgroundColor: colors.card,
  },
  textArea: { height: 100 },
  inputError: { borderColor: '#c0392b' },
  errorText: { color: '#c0392b', fontSize: 11, marginTop: 4 },
  pickerWrapper: {
    borderWidth: 1, borderColor: colors.line, borderRadius: 10,
    overflow: 'hidden', backgroundColor: colors.card,
  },
  submitButton: {
    backgroundColor: colors.brand, borderRadius: 12, paddingVertical: 13,
    marginTop: 22, marginBottom: 10,
  },
  submitText: { color: '#fff', textAlign: 'center', fontWeight: '700', fontSize: 15 },
});