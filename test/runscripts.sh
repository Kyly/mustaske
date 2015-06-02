#!/usr/bin/env bash
TESTS="test/selenium_src/*.py"
FILE="test/selenium_src/test_front.log"
# Clear prevous log
rm -rf $FILE

echo "Results are logged to $FILE"
echo "Stopping other instances of node ./bin/www"
pkill -f "node ./bin/www"
node ./bin/www &

# Run all python files in selenium
for file in $TESTS
do
  echo "Running $file:" >> $FILE
  python $file 2>&1 | tee -a $FILE
done

echo "\n\nAll test done"
echo "Stopping node ./bin/www\n"
pkill -f "node ./bin/www"