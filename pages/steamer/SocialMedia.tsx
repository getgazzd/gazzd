import { motion } from "framer-motion";
import React from "react";
import { Steamer } from "types/steamer";

import Icon from "components/Shared/Icon";

interface Props {
  steamer: Steamer;
}

const animation = {
  initial: { x: 10, opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { delay: 0.3 } },
};

type SocialLink = {
  fields: { link: string; platform: [string] };
};

const SocialMedia = ({ steamer }: Props) => {
  if (!steamer) return null;
  return (
    <div className="flex flex-row space-x-8 py-6">
      {steamer.socialMediaLinks.map((social: SocialLink) => (
        <SocialMediaLink key={social.fields.link} social={social} />
      ))}
    </div>
  );
};

export default SocialMedia;

const SocialMediaLink = ({ social }: { social: SocialLink }) => {
  return (
    <motion.a
      href={social.fields.link}
      rel="noreferrer"
      target="_blank"
      {...animation}
    >
      <Icon type={social.fields.platform[0]} />
    </motion.a>
  );
};
