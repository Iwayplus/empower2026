import React from 'react';
import { SectionComponents } from './ComponentRegistry';

const DynamicSectionRenderer = ({ section, ...props }) => {
  const Renderer = SectionComponents[section?.section_type] || SectionComponents.fallback;

  return <Renderer section={section} {...props} />;
};

export default DynamicSectionRenderer;
