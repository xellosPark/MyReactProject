import React, { useState } from 'react';
import { Tabs } from 'antd';
import { Resizable } from 'react-resizable';
import 'antd/dist/reset.css'; // Ant Design CSS for v5+
import 'react-resizable/css/styles.css';

const { TabPane } = Tabs;

const ResizableTabs = () => {
  // Initialize tab header widths
  const [widths, setWidths] = useState({
    tab1: 1,
    tab2: 1,
    tab3: 1,
  });

  // Handle resize
  const handleResize = (key) => (e, { size }) => {
    setWidths((prevWidths) => ({
      ...prevWidths,
      [key]: size.width,
    }));
  };

  return (
    <div style={{ width: '600px', margin: '0 auto' }}>
      <h2>Ant Design Tabs with Resizable Headers</h2>
      <Tabs defaultActiveKey="1">
        <TabPane
          tab={
            <Resizable
              width={widths.tab1}
              height={0}
              onResize={handleResize('tab1')}
              draggableOpts={{ enableUserSelectHack: false }}
              minConstraints={[100, 0]} // Minimum width constraint
              maxConstraints={[300, 0]} // Maximum width constraint (optional)
            >
              <div
                style={{
                  width: widths.tab1,
                  textAlign: 'center',
                  borderRight: '1px solid #ccc', // Visual handle cue
                  padding: '0 8px', // Padding for better appearance
                  cursor: 'ew-resize', // Cursor indicator
                }}
              >
                Tab 1
              </div>
            </Resizable>
          }
          key="1"
        >
          Content of Tab 1
        </TabPane>
        <TabPane
          tab={
            <Resizable
              width={widths.tab2}
              height={0}
              onResize={handleResize('tab2')}
              draggableOpts={{ enableUserSelectHack: false }}
              minConstraints={[100, 0]} // Minimum width constraint
              maxConstraints={[300, 0]} // Maximum width constraint (optional)
            >
              <div
                style={{
                  width: widths.tab2,
                  textAlign: 'center',
                  borderRight: '1px solid #ccc', // Visual handle cue
                  padding: '0 8px',
                  cursor: 'ew-resize',
                }}
              >
                Tab 2
              </div>
            </Resizable>
          }
          key="2"
        >
          Content of Tab 2
        </TabPane>
        <TabPane
          tab={
            <Resizable
              width={widths.tab3}
              height={0}
              onResize={handleResize('tab3')}
              draggableOpts={{ enableUserSelectHack: false }}
              minConstraints={[100, 0]} // Minimum width constraint
              maxConstraints={[300, 0]} // Maximum width constraint (optional)
            >
              <div
                style={{
                  width: widths.tab3,
                  textAlign: 'center',
                  padding: '0 8px',
                  cursor: 'ew-resize',
                }}
              >
                Tab 3
              </div>
            </Resizable>
          }
          key="3"
        >
          Content of Tab 3
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ResizableTabs;