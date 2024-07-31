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
import { useGetImageSearchResult } from "@/hooks/useGetImageSearchResult";
import { getHotkeyHandler } from "@mantine/hooks";
import DemoSearch from "../DemoSearch";
import { ProductCard } from '../ProductCard';

export function Main() {
  const { classes } = useStyles();
  const [query, setQuery] = useMountedState("");
  const [imageFile, setImageFile] = useMountedState<File | null>(null);
  const { data: textData, error: textError, loading: textLoading, getSearch, resetData: resetTextData } = useGetSearchResult();
  const { data: imageData, error: imageError, loading: imageLoading, getImageSearch, resetData: resetImageData } = useGetImageSearchResult();
  const [searchType, setSearchType] = useMountedState("neural");

  const data = searchType === "image" ? imageData : textData;
  const error = searchType === "image" ? imageError : textError;
  const loading = searchType === "image" ? imageLoading : textLoading;

  console.log("Data:", data);
  const handleSubmit = () => {
    if (searchType === "image" && imageFile) {
      getImageSearch(imageFile);
    } else if (query) {
      getSearch(query, searchType === "neural");
    }
  };

  const onClickFindSimilar = (data: string) => {
    if (data) {
      resetTextData();
      resetImageData();
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
          onChange={(file) => setImageFile(file)}
          className={classes.inputArea}
          rightSection={
            <Button
              className={classes.inputRightSection}
              size={"md"}
              variant="filled"
              color="Primary.2"
              onClick={handleSubmit}
              disabled={!imageFile}
            >
              Search
            </Button>
          }
          rightSectionWidth={"6rem"}
          placeholder="Upload an image"
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
              { label: "Image", value: "image" },
            ]}
            onChange={(value) => {
              setSearchType(value);
              resetTextData();
              resetImageData();
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
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Loader size="xl" color="Primary.2" variant="bars" />
            </Box>
          ) : error ? (
            <Box sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}>
              <Image maw={240} src="./error.gif" alt="Error occurred." />
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
                <Box sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                }}>
                  <Image maw={240} src="./NoResult.gif" alt="No results found." />
                  <Text size="lg" color="dimmed" className={classes.description}>
                    No results found. Try to use another query or image.
                  </Text>
                </Box>
              )}
            </Grid>
          ) : (
            <Box sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}>
              <Image maw={240} src="./home.gif" alt="Start searching." />
              <Text size="lg" color="dimmed" className={classes.description}>
                Enter a query or upload an image to start searching.
              </Text>
            </Box>
          )}
        </Container>
      </div>
    </Container>
  );
}