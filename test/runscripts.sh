#!/usr/bin/env bash
TESTS="selenium_src/*.py"

# Clear prevous log
rm -rf test_front.log

# Run all python files in selenium
for file in $TESTS
do
  echo "Running $file:" >> test_front.log
  python $file 2>&1 | tee -a test_front.log
done