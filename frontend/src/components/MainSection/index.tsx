import {
  Text,
  Button,
  Container,
  TextInput,
  Loader,
  Box,
  Grid,
  Image,
  SegmentedControl,
  FileInput,
} from "@mantine/core";
import { IconSearch, IconUpload } from "@tabler/icons-react";
import { useStyles } from "./style";
import useMountedState from "@/hooks/useMountedState";
import { useGetSearchResult } from "@/hooks/useGetSearchResult";
import { getHotkeyHandler } from "@mantine/hooks";
import DemoSearch from "../DemoSearch";
import { ProductCard } from '../ProductCard';

export function Main() {
  const { classes } = useStyles();
  const [query, setQuery] = useMountedState("");
  const [imageFile, setImageFile] = useMountedState<File | null>(null);
  const { data, error, loading, getSearch, resetData } = useGetSearchResult();
  const [searchType, setSearchType] = useMountedState("neural");

  const handleSubmit = () => {
    if (searchType === "image" && imageFile) {
      // Handle image search
      // You'll need to implement the image search functionality
      console.log("Performing image search with file:", imageFile);
    } else if (query) {
      getSearch(query, searchType === "neural");
    }
  };

  const onClickFindSimilar = (data: string) => {
    if (data) {
      resetData();
      setQuery(data);
      getSearch(data, searchType === "neural");
    }
  };

  const renderSearchInput = () => {
    if (searchType === "image") {
      return (
        <FileInput
          icon={<IconUpload size="1rem" />}
          accept="image/*"
          value={imageFile}
          onChange={(files) => setImageFile(files)}
          className={classes.inputArea}
        />
      );
    } else {
      return (
        <TextInput
          radius={30}
          size="md"
          icon={<IconSearch color="#102252" />}
          placeholder="Enter a query"
          rightSection={
            <Button
              className={classes.inputRightSection}
              radius={30}
              size={"md"}
              variant="filled"
              color="Primary.2"
              onClick={handleSubmit}
            >
              Search
            </Button>
          }
          rightSectionWidth={"6rem"}
          className={classes.inputArea}
          value={query}
          required
          onChange={(event) => setQuery(event.currentTarget.value)}
          onKeyDown={getHotkeyHandler([["Enter", handleSubmit]])}
        />
      );
    }
  };

  return (
    <Container className={classes.wrapper} size={1400}>
      <div className={classes.inner}>
        <Container p={0} size={600} className={classes.controls}>
          <SegmentedControl
            radius={30}
            data={[
              { label: "Neural", value: "neural" },
              { label: "Text", value: "text" },
              // { label: "Hybrid", value: "hybrid" },
              { label: "Image", value: "image" },
            ]}
            onChange={(value) => {
              setSearchType(value);
              resetData();
              setQuery("");
              setImageFile(null);
            }}
            size="md"
            color="Primary.2"
            className={classes.control}
            value={searchType}
          />
          {renderSearchInput()}
        </Container>

        <DemoSearch handleDemoSearch={onClickFindSimilar} />
        <Container className={classes.viewResult}>
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Loader size="xl" color="Primary.2" variant="bars" />
            </Box>
          ) : error ? (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Image maw={240} src="./error.gif" alt="No results found." />

              <Text size="lg" color="dimmed" className={classes.description}>
                Error: {error}
              </Text>
            </Box>
          ) : data?.result ? (
            <Grid mt={"md"}>
              {data.result.length > 0 ? (
                data.result.map((item) => (
                  <Grid.Col span={12} key={item.uuid}>
                    <ProductCard
                      Index={item.uuid}
                      name={item.name}
                      images={item.image_url}
                      description={item.document}
                      link={item.product_url}
                      title={item.title}
                      price={item.price}
                      onClickFindSimilar={onClickFindSimilar}
                    />
                  </Grid.Col>
                ))
              ) : (
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Image
                    maw={240}
                    src="./NoResult.gif"
                    alt="No results found."
                  />

                  <Text
                    size="lg"
                    color="dimmed"
                    className={classes.description}
                  >
                    No results found. Try to use another query.
                  </Text>
                </Box>
              )}
            </Grid>
          ) : (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Image maw={240} src="./home.gif" alt="No results found." />

              <Text size="lg" color="dimmed" className={classes.description}>
                Enter a query to start searching.
              </Text>
            </Box>
          )}
        </Container>
      </div>
    </Container>
  );
}
