#include <iostream>
#include <gtest/gtest.h>

#include "pixels_generator_cbridge.h"

using namespace ::testing;


class TestPixelsGeneratorCBridge : public Test
{
public:

private:
  virtual void SetUp()
  {
  }

  virtual void TearDown()
  {
  }
};

TEST_F(TestPixelsGeneratorCBridge, test_generate_simple)
{
  int** generated_pixels;
  int number_of_pixels_to_generate = 10;
  int image_dimensions_array[] = {40, 30};

  generated_pixels = pixelsgenerator_generate_simple(image_dimensions_array, number_of_pixels_to_generate);

  for(int i = 0; i < number_of_pixels_to_generate; i++)
  {
    ASSERT_GE(generated_pixels[0][i], 0);
    ASSERT_GE(generated_pixels[1][i], 0);
    ASSERT_LT(generated_pixels[0][i], image_dimensions_array[0]);
    ASSERT_LT(generated_pixels[1][i], image_dimensions_array[1]);
  }
}


int main(int argc, char** argv)
{
  InitGoogleTest(&argc, argv);
  return RUN_ALL_TESTS();
}
