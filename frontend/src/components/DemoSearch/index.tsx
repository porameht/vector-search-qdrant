import { Box, Button, Text, createStyles } from "@mantine/core";
import { IconPointerSearch } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto",
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
    },
  },

  demoBtn: {
    borderColor: theme.colors.Neutral[2],
    color: theme.colors.Neutral[6],
    fontWeight: 400,
    fontSize: 14,
    lineHeight: 21,
  },

  demoText: {
    fontWeight: 400,
    fontSize: 16,
    color: theme.colors.Neutral[6],
  },
}));

type DemoButtonProps = {
  text: string;
  onClick: () => void;
};

type DemoSearchProps = {
  handleDemoSearch: (query: string, isNeural: boolean) => void;
  searchType: any;
  neuralDemoTexts: string[];
  textDemoTexts: string[];
  tryThisText?: string;
};

const DemoButton = ({ text, onClick }: DemoButtonProps) => {
  const { classes } = useStyles();
  return (
    <Button
      variant="outline"
      color="Primary.2"
      radius="lg"
      leftIcon={<IconPointerSearch size="1.3rem" />}
      className={classes.demoBtn}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default function DemoSearch({
  handleDemoSearch,
  searchType,
  neuralDemoTexts,
  textDemoTexts,
  tryThisText = "Try this:"
}: DemoSearchProps) {
  const { classes } = useStyles();

  const demoTexts = searchType === "neural" ? neuralDemoTexts : textDemoTexts;

  if (searchType === "image") {
    return null;
  }

  return (
    <Box className={classes.wrapper}>
      <Text className={classes.demoText}>{tryThisText}</Text>
      {demoTexts.map((text, index) => (
        <DemoButton
          key={index}
          text={text}
          onClick={() => handleDemoSearch(text, searchType === "neural")}
        />
      ))}
    </Box>
  );
}
