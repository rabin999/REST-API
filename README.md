# REST (<b>REp</b>resentational <b>S</b>tate <b>T</b>ransfer) API Implementation

## Overview

#### Resource-Based
- Individual resources are identified in requests using URIs as resource identifiers. The resources themselves are conceptually separate from the representations that are returned to the client. For example, the server does not send its database, but rather, some HTML, XML or JSON that represents some database records expressed, for instance, in Finnish and encoded in UTF-8, depending on the details of the request and the server implementation.

#### Manipulation of Resources Through Representations
- When a client holds a representation of a resource, including any metadata attached, it has enough information to modify or delete the resource on the server, provided it has permission to do so.

#### Self-descriptive Messages
- Each message includes enough information to describe how to process the message. For example, which parser to invoke may be specified by an Internet media type (previously known as a MIME type). Responses also explicitly indicate their cache-ability.

#### Hypermedia as the Engine of Application State (HATEOAS)
- Clients deliver state via body contents, query-string parameters, request headers and the requested URI (the resource name). Services deliver state to clients via body content, response codes, and response headers. This is technically referred-to as hypermedia (or hyperlinks within hypertext).

- Aside from the description above, HATEOS also means that, where necessary, links are contained in the returned body (or headers) to supply the URI for retrieval of the object itself or related objects. We'll talk about this in more detail later.

## Six Constraints are
1. Uniform Interface
2. Stateless
3. Client-Server
4. Cacheable
5. Layered System
6. Code on Demand (optional)

### 1. Uniform Interface
- Defines the interface between client and server
- Simplifies and decouples the architecture
- Foundamental to RESTful design
- For us this means:
    - HTTP verbs (GET, PUT, POST, DELETE)
    - URIs (resource name)
    - HTTP response (status, body)


### 2. Stateless
- Server contains no client state
- Each request contains enough context to process the message
    - Self-descriptive message
- Any session state is held on the client


### 3. Client-Server
- Assume a disconnected system
- Separation of concerns
- Uniform interface is the link between the two

### 4. Cacheable
- Server responses (representations) are cacheable
    - Implicitly
    - Explicitly
    - Negotiated

### 5. Layered System
- Client can't assume direct connection to server
- Software or hardware intermediaries between client and server
- Improves scalability

### 6. Code On Demand
- Server can temporarily extend client
- Transfer logic to client
- Client executes logic
- For example:
    - Java applets
    - JavaScript
- The only optional constraint

## Compliance with REST constrains allows:
- Scalability
- Simplicity
- Modifiability
- Visibility
- Portability
- Reliability

## Resources
- [HTTP Status Code](https://www.ietf.org/assignments/http-status-codes/http-status-codes.xml)
- [400 vs 422](https://tools.ietf.org/html/rfc4918#section-11.2)

## References
+ [Keep Alive](https://www.imperva.com/learn/performance/http-keep-alive/)
+ [Cacheable](https://restfulapi.net/caching/)
+ [API Design](https://docs.microsoft.com/en-us/azure/architecture/best-practices/api-design)
+ [Code on Demand Example](https://www.pjohnson.info/2015/03/31/code-on-demand-what-is-it/)
+ [Intro to REST (aka. What Is REST Anyway?)](https://www.youtube.com/watch?v=llpr5924N7E)
+ [Representational State Transfer (REST)](https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm)

## Example
+ [Shopware](https://developers.shopware.com/developers-guide/rest-api/)