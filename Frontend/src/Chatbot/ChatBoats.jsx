import style from './ChatBot.module.css'
import React, { useState } from "react";
import ChatBot from "react-simple-chatbot";
import { Segment } from "semantic-ui-react";
import { FaRobot, FaTimes } from "react-icons/fa";

function ChatBots() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleChatBot = () => {
      setIsOpen(!isOpen);
    };
  
    const steps = [
      {
        id: 'Greet',
        message: 'Hello, Welcome to Apni-Shop! How can we assist you today?',
        trigger: 'AskName'
      },
      {
        id: 'AskName',
        message: 'What is your name?',
        trigger: 'Name'
      },
      {
        id: 'Name',
        user: true,
        trigger: 'AskPhoneNumber'
      },
      {
        id: 'AskPhoneNumber',
        message: 'Could you please provide your phone number for verification?',
        trigger: 'Phone'
      },
      {
        id: 'Phone',
        user: true,
        trigger: 'AskIssue'
      },
      {
        id: 'AskIssue',
        message: 'Please select your issue from the options below.',
        trigger: 'issues'
      },
      {
        id: 'issues',
        options: [
          { value: 'Order Status', label: 'Order Status', trigger: 'OrderStatus' },
          { value: 'Product Inquiry', label: 'Product Inquiry', trigger: 'ProductInquiry' },
          { value: 'Return or Refund', label: 'Return or Refund', trigger: 'ReturnRefund' },
          { value: 'Account Issue', label: 'Account Issue', trigger: 'AccountIssue' }
        ]
      },
      {
        id: 'OrderStatus',
        message: 'Please provide your order ID to check the status.',
        trigger: 'OrderID'
      },
      {
        id: 'OrderID',
        user: true,
        trigger: 'OrderStatusResponse'
      },
      {
        id: 'OrderStatusResponse',
        message: 'Thank you! We are checking the status of your order. You will receive an update shortly.',
        trigger: 'AnythingElse'
      },
      {
        id: 'ProductInquiry',
        message: 'Please provide the product name or ID you are inquiring about.',
        trigger: 'ProductID'
      },
      {
        id: 'ProductID',
        user: true,
        trigger: 'ProductInquiryResponse'
      },
      {
        id: 'ProductInquiryResponse',
        message: 'We have noted your product inquiry. Our team will contact you with more details shortly.',
        trigger: 'AnythingElse'
      },
      {
        id: 'ReturnRefund',
        message: 'Could you provide your order ID for the return or refund request?',
        trigger: 'ReturnOrderID'
      },
      {
        id: 'ReturnOrderID',
        user: true,
        trigger: 'ReturnRefundResponse'
      },
      {
        id: 'ReturnRefundResponse',
        message: 'Thank you! Your return or refund request has been submitted. Our team will process it soon.',
        trigger: 'AnythingElse'
      },
      {
        id: 'AccountIssue',
        message: 'Please describe your account-related issue.',
        trigger: 'AccountDetails'
      },
      {
        id: 'AccountDetails',
        user: true,
        trigger: 'AccountIssueResponse'
      },
      {
        id: 'AccountIssueResponse',
        message: 'Thank you for providing the details. Our support team will reach out to you shortly.',
        trigger: 'AnythingElse'
      },
      {
        id: 'AnythingElse',
        message: 'Is there anything else I can help you with?',
        trigger: 'FinalResponse'
      },
      {
        id: 'FinalResponse',
        options: [
          { value: 'Yes', label: 'Yes', trigger: 'AskIssue' },
          { value: 'No', label: 'No', trigger: 'Goodbye' }
        ]
      },
      {
        id: 'Goodbye',
        message: 'Thank you for contacting Apni-Shop. Have a great day!',
        end: true
      }
    ];
  
    return (
      <div className={style.chatbotContainer}>
        <div
          className={style.chatbotIcon}
          onClick={toggleChatBot}
        >
          <div className={style.icon}>
            {isOpen ? <FaTimes size="30" /> : <FaRobot size="30" />}
          </div>
        </div>
        {isOpen && (
          <Segment className={style.chatbotSegment}>
            <ChatBot steps={steps} />
          </Segment>
        )}
      </div>
    );
  
}

export default ChatBots