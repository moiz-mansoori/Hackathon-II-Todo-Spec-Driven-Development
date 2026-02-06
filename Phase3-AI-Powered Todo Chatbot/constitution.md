# Phase 3 Constitution: AI-First Task Management

This constitution extends Phase 2, introducing agents and tool-use as a core project pillar.

## Core Principles

1.  **AI Utility**: The chatbot must provide tangible value (e.g., adding tasks via voice-like text) rather than just being a novelty.
2.  **Tool Safety**: Agents must only interact with data they have explicit permissions for (User isolation).
3.  **MCP Standards**: Use Model Context Protocol (MCP) to decouple the AI's logic from the specific database implementation.
4.  **Natural Language First**: Focus on error tolerance in natural language (e.g., "remind me to buy milk tomorrow" should work).
5.  **Clean Integration**: The AI component should feel like a part of the UI, not an overlay.

## Architectural Requirements

- **MCP Server**: A standalone service (or integrated module) that exposes Todo CRUD operations as MCP tools.
- **Agent Orchestration**: Use OpenAI Agents SDK for reliable tool calling and conversation management.
- **Streaming**: Implementation of real-time response streaming for a responsive UI.
