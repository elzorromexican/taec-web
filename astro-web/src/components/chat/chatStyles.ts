import React from 'react';

// Tipado estricto para asegurar que son objetos válidos de React.CSSProperties
export const chatStyles: Record<string, React.CSSProperties> = {
  floatingButton: {
    position: 'fixed' as const, bottom: '30px', right: '30px',
    background: '#004775', color: 'white',
    width: '65px', height: '65px', borderRadius: '50%',
    boxShadow: '0 8px 24px rgba(0,71,117,0.5)',
    border: '2px solid #fff', cursor: 'pointer', zIndex: 9999,
    alignItems: 'center', justifyContent: 'center', // display is handled dynamically
    transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
  },
  notificationBadge: {
    position: 'absolute' as const, top: '-15px', right: '-20px',
    color: 'white', padding: '4px 8px',
    borderRadius: '12px', fontSize: '11px', fontWeight: 'bold',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)', animation: 'bounce 2s infinite',
    whiteSpace: 'nowrap' as const, zIndex: 10000
    // background color handled dynamically based on countryCode
  },
  windowContainer: {
    position: 'fixed' as const, bottom: '110px', 
    right: 'clamp(10px, 5vw, 30px)',
    background: '#fff', borderRadius: '16px',
    boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
    display: 'flex', flexDirection: 'column' as const, zIndex: 9999,
    overflow: 'hidden', fontFamily: '"Inter", sans-serif',
    border: '1px solid #E5E7EB',
    transition: 'all 0.3s ease'
    // width, height, maxHeight handled dynamically based on isExpanded
  },
  titleBar: {
    display: 'flex', justifyContent: 'flex-end', alignItems: 'center',
    gap: '8px', padding: '6px 12px',
    background: '#002d4a', borderBottom: '1px solid rgba(255,255,255,0.08)'
  },
  windowButton: {
    width: '14px', height: '14px', borderRadius: '50%',
    border: 'none', cursor: 'pointer', padding: 0, display: 'flex',
    alignItems: 'center', justifyContent: 'center',
    boxShadow: 'inset 0 0 4px rgba(0,0,0,0.2)'
  },
  windowButtonIcon: {
    fontSize: '8px', color: 'rgba(0,0,0,0.5)', lineHeight: 1
  },
  headerContainer: {
    background: '#004775', padding: '12px 16px', color: 'white',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    flexWrap: 'wrap' as const, gap: '8px'
  },
  headerIconWrapper: {
    width: '38px', height: '38px', borderRadius: '50%', background: '#fff',
    display: 'flex', alignItems: 'center', justifyContent: 'center'
  },
  headerTitle: { margin: 0, fontSize: '15px', fontWeight: 800 },
  headerSubtitle: { margin: 0, fontSize: '12px', color: '#A8DBD9' },
  headerControlsContainer: { display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' as const, justifyContent: 'flex-end' },
  
  chatBody: {
    flex: 1, padding: '16px', background: '#F8FAFC',
    overflowY: 'auto' as const, display: 'flex', flexDirection: 'column' as const, gap: '12px',
    overscrollBehavior: 'contain'
  },
  startScreenContainer: { marginTop: '20px' },
  startScreenTextContainer: { textAlign: 'center' as const, marginBottom: '20px' },
  startScreenTitle: { margin: '0 0 8px', color: '#004775', fontSize: '18px' },
  startScreenSubtitle: { margin: 0, fontSize: '14px', color: '#6B7280' },
  startScreenForm: { display: 'flex', flexDirection: 'column' as const, gap: '12px' },
  startScreenInput: { padding: '12px', border: '1px solid #D1D5DB', borderRadius: '8px' },
  startScreenButton: {
    padding: '12px', background: '#F59E0B', color: '#fff', 
    border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer'
  },
  
  messageWrapper: { display: 'flex' },
  messageBubble: {
    maxWidth: '85%', padding: '12px 16px', fontSize: '14px', lineHeight: '1.5',
    borderRadius: '12px',
  },
  promoContainer: {
    marginTop: '12px', padding: '14px', background: '#FFF7ED', border: '1px solid #F97316',
    borderRadius: '8px', borderLeft: '4px solid #F97316'
  },
  promoBadge: { fontSize: '10px', fontWeight: 900 as const, color: '#EA580C', marginBottom: '4px', textTransform: 'uppercase' as const, letterSpacing: '0.8px' },
  promoTitle: { margin: '0 0 6px 0', color: '#9A3412', fontSize: '14px', fontWeight: 800 as const },
  promoDescription: { margin: '0 0 12px 0', fontSize: '13px', color: '#C2410C', lineHeight: '1.4' },
  promoLink: {
    display: 'inline-block', background: '#F97316', color: 'white', fontWeight: 'bold',
    fontSize: '12px', padding: '6px 14px', borderRadius: '6px', textDecoration: 'none',
    boxShadow: '0 2px 4px rgba(249,115,22,0.2)'
  },
  expandButton: {
    marginTop: '6px', fontSize: '11px', color: '#3179C2',
    background: 'none', border: '1px solid #DBEAFE',
    borderRadius: '12px', padding: '3px 10px', cursor: 'pointer',
    display: 'inline-block', transition: 'background 0.2s'
  },
  loadingText: { padding: '8px', alignSelf: 'flex-start' as const, fontSize: '13px', color: '#64748B' },
  spacer: { height: '60px', width: '100%', flexShrink: 0 },
  
  footerContainer: { background: '#fff', borderTop: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column' as const },
  footerForm: { padding: '12px', display: 'flex', gap: '8px' },
  footerTextarea: {
    flex: 1, padding: '10px 16px', borderRadius: '20px',
    border: '1px solid #E5E7EB', background: '#F3F4F6',
    fontSize: '14px', outline: 'none', resize: 'none' as const,
    lineHeight: '1.4', minHeight: '40px', maxHeight: '120px',
    fontFamily: 'inherit'
  },
  footerSubmitButton: {
    width: '40px', height: '40px', borderRadius: '50%',
    color: 'white', border: 'none', 
    display: 'flex', alignItems: 'center', justifyContent: 'center'
    // background and cursor handled dynamically based on state
  },
  footerDisclaimer: { textAlign: 'center' as const, paddingBottom: '10px', fontSize: '10px', color: '#9CA3AF', paddingLeft: '16px', paddingRight: '16px' }
};

export const markdownStyles = {
  p: { margin: '0 0 8px 0' },
  ul: { margin: '0 0 8px 16px', padding: 0 },
  li: { margin: '4px 0' },
  strong: { color: '#004775' }
};
