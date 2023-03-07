import MDXComponents from '@theme-original/MDXComponents';

/* Components */
import DocCardList from '@theme/DocCardList';
import Card from "@site/src/components/Card";
import Grid from "@site/src/components/Grid";

export default {
  ...MDXComponents,
  DocCardList: DocCardList,
  card: Card,
  grid: Grid
};
