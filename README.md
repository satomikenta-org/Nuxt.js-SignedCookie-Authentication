# auth-demo
- Nuxt.js with SingedCookie Auth behind ALB.

## Deployment Procedures
- 1. $ npm run build
- 2. $ pm2 start "npm run start"  

## Notice in Production 
- We need to specified server host (to '0.0.0.0') .
- We need to change axios BASE_URL (not localhost) .

### What I Learned
- Multiple Nuxt.js App with SignedCookie Authentication behind ALB works well.
  (Stateless and Scalable like JWT).
