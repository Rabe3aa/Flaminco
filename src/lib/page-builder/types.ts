export type BlockType =
  | "heading"
  | "text"
  | "image"
  | "gallery"
  | "spacer"
  | "banner"
  | "two-columns"
  | "quote";

export interface BlockBase {
  id: string;
  type: BlockType;
}

export interface HeadingBlock extends BlockBase {
  type: "heading";
  data: {
    text: string;
    level: "h1" | "h2" | "h3";
    alignment: "left" | "center" | "right";
  };
}

export interface TextBlock extends BlockBase {
  type: "text";
  data: {
    content: string;
    alignment: "left" | "center" | "right";
  };
}

export interface ImageBlock extends BlockBase {
  type: "image";
  data: {
    src: string;
    alt: string;
    caption: string;
    fullWidth: boolean;
    rounded: boolean;
  };
}

export interface GalleryBlock extends BlockBase {
  type: "gallery";
  data: {
    images: { src: string; alt: string }[];
    columns: 2 | 3 | 4;
  };
}

export interface SpacerBlock extends BlockBase {
  type: "spacer";
  data: {
    height: "sm" | "md" | "lg" | "xl";
  };
}

export interface BannerBlock extends BlockBase {
  type: "banner";
  data: {
    text: string;
    backgroundColor: string;
    textColor: string;
    padding: "sm" | "md" | "lg";
  };
}

export interface TwoColumnsBlock extends BlockBase {
  type: "two-columns";
  data: {
    left: { type: "text" | "image"; content: string };
    right: { type: "text" | "image"; content: string };
    split: "50-50" | "60-40" | "40-60";
  };
}

export interface QuoteBlock extends BlockBase {
  type: "quote";
  data: {
    text: string;
    author: string;
  };
}

export type Block =
  | HeadingBlock
  | TextBlock
  | ImageBlock
  | GalleryBlock
  | SpacerBlock
  | BannerBlock
  | TwoColumnsBlock
  | QuoteBlock;

export interface BlockDefinition {
  type: BlockType;
  label: string;
  icon: string;
  description: string;
  defaultData: Block["data"];
}

export const BLOCK_DEFINITIONS: BlockDefinition[] = [
  {
    type: "heading",
    label: "Heading",
    icon: "Type",
    description: "Section title or heading",
    defaultData: { text: "Section Title", level: "h2", alignment: "left" },
  },
  {
    type: "text",
    label: "Text",
    icon: "AlignLeft",
    description: "Paragraph or rich text content",
    defaultData: { content: "Enter your text here...", alignment: "left" },
  },
  {
    type: "image",
    label: "Image",
    icon: "Image",
    description: "Single image with optional caption",
    defaultData: { src: "", alt: "", caption: "", fullWidth: true, rounded: true },
  },
  {
    type: "gallery",
    label: "Gallery",
    icon: "LayoutGrid",
    description: "Grid of multiple images",
    defaultData: { images: [], columns: 3 },
  },
  {
    type: "spacer",
    label: "Spacer",
    icon: "SeparatorHorizontal",
    description: "Vertical spacing between sections",
    defaultData: { height: "md" },
  },
  {
    type: "banner",
    label: "Banner",
    icon: "RectangleHorizontal",
    description: "Colored background section with text",
    defaultData: { text: "Banner text", backgroundColor: "#0072BB", textColor: "#ffffff", padding: "md" },
  },
  {
    type: "two-columns",
    label: "Two Columns",
    icon: "Columns2",
    description: "Side-by-side layout",
    defaultData: {
      left: { type: "text", content: "Left column content" },
      right: { type: "text", content: "Right column content" },
      split: "50-50",
    },
  },
  {
    type: "quote",
    label: "Quote",
    icon: "Quote",
    description: "Highlighted quote or testimonial",
    defaultData: { text: "Quote text here", author: "" },
  },
];
