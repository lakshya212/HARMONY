# HARMONY PROJECT CONSTITUTION & RULES

1. **Working > Ambitious**: A stable 8-feature application that survives a live demonstration is worth more than a 25-feature application that breaks under questioning.
2. **Architecture Lock**: Do not change the 3-tier architecture or redesign the database schema unnecessarily.
3. **Dependency Control**: Do not install heavy or redundant npm packages.
4. **Zero-Secret Leakage**: Never commit `.env` or service role keys to Git.
5. **Zero Data Gathering**: Use the synthetic seed dataset (`Green Residency` with 4 roommates). No surveys or web scraping.
6. **No Real Money Movement**: Expenses are mathematical allocations and records only. No UPI/Stripe payment gateways in MVP.
7. **No ML in MVP**: Advanced AI insights belong strictly in Future Scope.
8. **Test Before Commit**: Every completed feature must be tested locally before pushing to Git or deploying.
9. **Render Cold-Start Protection**: Warm up `/api/health` 5–10 minutes before live panel demonstration.
